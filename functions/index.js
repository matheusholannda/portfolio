const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const aws = require('@aws-sdk/client-ses');

const app = express();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const ses = new aws.SES({
  region: 'us-east-1',
});

const ORIGINS = ['https://matheusholanda.com.br', 'https://www.matheusholanda.com.br'];
const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL = 'hello@matheusholanda.com.br';
const FROM_EMAIL = 'mailbot@matheusholanda.com.br';
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!ORIGINS.includes(origin)) {
        return callback(
          new Error(`Not allowed by CORS. Origin must be: ${ORIGINS.join(' or ')}`)
        );
      }

      return callback(null, true);
    },
  })
);
app.options('*', cors());

app.post('/message', async (req, res) => {
  try {
    const email = DOMPurify.sanitize(req.body.email);
    const message = DOMPurify.sanitize(req.body.message);

    // Validate email request
    if (!email || !EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ error: 'Por favor insira um endereço de e-mail válido' });
    }

    if (!message) {
      return res.status(400).json({ error: 'Por favor, digite uma mensagem' });
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({
        error: `Insira um e-mail com menos de ${MAX_EMAIL_LENGTH} caracteres`,
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Insira uma mensagem com menos de ${MAX_MESSAGE_LENGTH} caracteres`,
      });
    }

    // Send email using AWS SES
    await ses.sendEmail({
      Source: `Portfolio <${FROM_EMAIL}>`,
      Destination: {
        ToAddresses: [EMAIL],
      },
      Message: {
        Subject: { Data: `Nova mensagem de ${email}` },
        Body: {
          Text: { Data: `De: ${email}\n\n${message}` },
        },
      },
    });

    return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Rejected', error);
    return res.status(500).json({ error: 'Mensagem rejeitada!' });
  }
});

module.exports.handler = serverless(app);
