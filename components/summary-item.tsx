import Link from 'next/link';
import React from 'react';
import { SummaryItemProps } from '../types';

const classes = {
  wrapper: 'mb-6',
  name: 'font-semibold text-gray-900 dark:text-gray-100 pb-1',
  description: 'text-md text-gray-600 dark:text-gray-300 font-light',
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
          link ? 'hover:underline hover:text-black dark:hover:text-white' : ''
        }`}
      >
        {link ? linkContent : name}
      </h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default SummaryItem;
