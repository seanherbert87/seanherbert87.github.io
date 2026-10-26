import React, { memo } from 'react';
import Section from './section';
import { ExternalLink, Calendar } from 'lucide-react';
import { Experience } from '../types';

interface SectionExperienceProps {
  experience: Experience[];
}

const SectionExperience: React.FC<SectionExperienceProps> = memo(({ experience }) => {
  if (!experience.length) return null;

  return (
    <Section title="Professional Experience">
      <div className="space-y-8">
        {experience.map((item, index) => (
                 <div
                   key={item.id || index}
                   className="relative bg-white/70 dark:bg-gray-900/60 rounded-md p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 transition-colors duration-300 group"
                 >
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex-1">
                       <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                         {item.company}
                       </h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-2 shrink-0" strokeWidth={1.5} />
                  <span className="font-mono text-xs">{item.position}</span>
                </div>
              </div>
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 p-2 rounded-sm text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                  aria-label={`Visit ${item.company} website`}
                >
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
                   <div className="border-l-2 border-primary-300 dark:border-primary-700 pl-4">
                     <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                       {item.description}
                     </p>
                   </div>
          </div>
        ))}
      </div>
    </Section>
  );
});

SectionExperience.displayName = 'SectionExperience';

export default SectionExperience;
