import React, { memo } from 'react';
import Section from './section';

interface SectionAboutProps {
  about: string;
}

const SectionAbout: React.FC<SectionAboutProps> = memo(({ about }) => {
  return (
    <Section title="About Me">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p className="text-lg leading-relaxed mb-6">{about}</p>
               <div className="flex flex-wrap gap-3 mt-8">
                 <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                   PHP & WordPress
                 </span>
                 <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                   WooCommerce
                 </span>
                 <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                   React & TypeScript
                 </span>
                 <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                   C# & .NET
                 </span>
                 <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium">
                   Custom Development
                 </span>
               </div>
      </div>
    </Section>
  );
});

SectionAbout.displayName = 'SectionAbout';

export default SectionAbout;
