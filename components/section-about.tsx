import React, { memo } from 'react';
import Section from './section';

interface SectionAboutProps {
  about: string;
}

const tags = ['PHP & WordPress', 'WooCommerce','React & TypeScript', 'Custom Development'];

const SectionAbout: React.FC<SectionAboutProps> = memo(({ about }) => {
  return (
    <Section title="About Me">
      <div className="max-w-none">
        <p className="text-lg leading-relaxed mb-6 font-light text-gray-700 dark:text-gray-300">{about}</p>
        <div className="flex flex-wrap gap-2 mt-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 border border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 rounded-sm font-mono text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
});

SectionAbout.displayName = 'SectionAbout';

export default SectionAbout;
