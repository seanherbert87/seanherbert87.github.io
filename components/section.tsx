import React from 'react';
import { SectionProps } from '../types';

const classes = {
  wrapper: 'mb-16 animate-fade-in',
  title: 'mb-8',
  heading: 'text-2xl font-bold text-gray-900 dark:text-white mb-2 relative inline-block',
  headingUnderline: 'absolute -bottom-2 left-0 w-12 h-1 bg-gray-600 dark:bg-gray-400 rounded-full',
  content: 'text-gray-700 dark:text-gray-300 leading-relaxed',
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className={classes.wrapper}>
      <div className={classes.title}>
        <h2 className={classes.heading}>
          {title}
          <span className={classes.headingUnderline}></span>
        </h2>
      </div>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default Section;
