import Link from 'next/link';
import React from 'react';
import { SummaryItemProps } from '../types';

const classes = {
  wrapper: 'grid gap-2 sm:grid-cols-[13rem_1fr] sm:gap-8 py-5 border-t border-gray-200 dark:border-gray-800 last:border-b',
  name: 'font-medium text-gray-900 dark:text-gray-100',
  description: 'text-[0.95rem] text-gray-600 dark:text-gray-400 font-light',
};

interface ExtendedSummaryItemProps extends SummaryItemProps {
  link?: string;
  internal?: boolean;
}

const SummaryItem: React.FC<ExtendedSummaryItemProps> = ({
  name,
  description,
  link,
  internal = false
}) => {
  let linkContent: React.ReactNode;
  if (internal && link) {
    linkContent = <Link href={link}>{name}</Link>;
  } else if (link) {
    linkContent = <a href={link} target="_blank" rel="nofollow noreferrer">{name}</a>;
  }

  return (
    <div className={classes.wrapper}>
      <h3
        className={`${classes.name} ${
          link ? 'hover:underline hover:text-primary-700 dark:hover:text-primary-300' : ''
        }`}
      >
        {link ? linkContent : name}
      </h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default SummaryItem;
