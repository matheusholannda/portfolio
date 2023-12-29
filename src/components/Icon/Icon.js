import { classes } from 'utils/style';
import styles from './Icon.module.css';
import ArrowLeft from './svg/arrow-left.svg';
import ArrowRight from './svg/arrow-right.svg';
import Check from './svg/check.svg';
import ChevronRight from './svg/chevron-right.svg';
import Close from './svg/close.svg';
import Copy from './svg/copy.svg';
import Error from './svg/error.svg';
import Figma from './svg/figma.svg';
import Github from './svg/github.svg';
import Linkedin from './svg/linkedin.svg';
import Link from './svg/link.svg';
import Menu from './svg/menu.svg';
import Pause from './svg/pause.svg';
import Play from './svg/play.svg';
import Send from './svg/send.svg';
import Twitter from './svg/twitter.svg';
import HTML from './svg/html.svg';
import CSS from './svg/css.svg';
import JS from './svg/js.svg';
import Bootstrap from './svg/bootstrap.svg';
import SQL from './svg/sql.svg';
import NoSQL from './svg/nosql.svg';
import Git from './svg/git.svg';
import Angular from './svg/angular.svg';
import React from './svg/react.svg';
import Vue from './svg/vue.svg';
import Next from './svg/next.svg';
import C from './svg/c#.svg';
import Java from './svg/java.svg';
import PHP from './svg/php.svg';
import Shell from './svg/bash.svg';
import Test from './svg/test.svg';
import Docker from './svg/docker.svg';
import Wordpress from './svg/wordpress.svg';
import Typescript from './svg/typescript.svg';

export const icons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  check: Check,
  chevronRight: ChevronRight,
  close: Close,
  copy: Copy,
  error: Error,
  figma: Figma,
  github: Github,
  linkedin: Linkedin,
  link: Link,
  menu: Menu,
  pause: Pause,
  play: Play,
  send: Send,
  twitter: Twitter,
  html: HTML,
  css: CSS,
  js: JS,
  bootstrap: Bootstrap,
  sql: SQL,
  nosql: NoSQL,
  git: Git,
  angular: Angular,
  react: React,
  vue: Vue,
  next: Next,
  c: C,
  java: Java,
  php: PHP,
  shell: Shell,
  test: Test,
  docker: Docker,
  wordpress: Wordpress,
  typescript: Typescript
};

export const Icon = ({ icon, className, ...rest }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden className={classes(styles.icon, className)} {...rest} />
  );
};
