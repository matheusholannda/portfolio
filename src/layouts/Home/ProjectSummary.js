import projectKatakana from 'assets/katakana-project.svg?url';
import { Icon } from 'components/Icon';
import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { deviceModels } from 'components/Model/deviceModels';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { useWindowSize } from 'hooks';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { cssProps, media } from 'utils/style';
import styles from './ProjectSummary.module.css';
import { skills } from './ProjectData';

const Model = dynamic(() => import('components/Model').then(mod => mod.Model));

export const ProjectSummary = ({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  useEffect(() => {
    let show = true
    document.addEventListener('scroll', function () {
      if (window.pageYOffset > document.querySelector('.ProjectSummary_techInner__hdm7l')?.getBoundingClientRect().top) {
        show = false
        document.querySelectorAll('.ProjectSummary_techInner__hdm7l').forEach((x, i) => {
          setTimeout(() => x.classList.add('ProjectSummary_effect__s7kc0'), Math.floor(i % 3 + (i / 3)) * 200)
        })
      }
    })
  }, [])

  const renderDetails = visible => (
    <div className={styles.details}>
      <div aria-hidden className={styles.index}>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={!visible}
          collapseDelay={1000}
        />
        <span className={styles.indexNumber} data-visible={visible}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={styles.title}
        data-visible={visible}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className={styles.description} data-visible={visible} as="p">
        {description}
      </Text>
    </div>
  );

  const renderPreview = visible => (
    <div className={styles.preview}>
      {model.type === 'laptop' && (
        <>
          <div className={styles.model} data-device="laptop">
            <div className={styles.techs}>
              {skills.map(({ label, icon }) => (
                <div className={styles.tech}>
                  <div className={styles.techInner}>
                    <a
                      key={label}
                      className={styles.navIconLink}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className={styles.navIcon} icon={icon} />
                    </a>
                    <label>{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {model.type === 'phone' && (
        <>
          <div className={styles.model} data-device="laptop">
            <div className={styles.techs}>
              {skills.map(({ label, icon }) => (
                <div className={styles.tech}>
                  <div className={styles.techInner}>
                    <a
                      key={label}
                      className={styles.navIconLink}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className={styles.navIcon} icon={icon} />
                    </a>
                    <label>{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {visible => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
};
