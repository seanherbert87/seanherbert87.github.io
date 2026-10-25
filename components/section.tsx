import React from 'react';
import { SectionProps } from '../types';

const classes = {
  wrapper: 'mb-20 animate-fade-in',
  title: 'mb-8 flex items-center gap-4',
  index: 'section-index font-mono text-xs text-primary-600 dark:text-primary-400',
  heading: 'text-sm font-medium uppercase tracking-[0.18em] text-gray-900 dark:text-gray-100',
  rule: 'flex-1 h-px bg-gray-200 dark:bg-gray-800',
  content: 'text-gray-700 dark:text-gray-300 leading-relaxed',
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className={classes.wrapper}>
      <div className={classes.title}>
        <span className={classes.index} aria-hidden="true" />
        <h2 className={classes.heading}>{title}</h2>
        <span className={classes.rule} aria-hidden="true" />
      </div>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default Section;
