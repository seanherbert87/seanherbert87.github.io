import React, { memo } from 'react';
import Section from './section';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';
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
                   className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 group"
                 >
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex-1">
                       <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                         {item.company}
                       </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{item.position}</span>
                </div>
              </div>
              {item.website && (
                <a 
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={`Visit ${item.company} website`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
                   <div className="border-l-4 border-gray-600 dark:border-gray-400 pl-4">
                     <p className="text-gray-600 dark:text-gray-300 text-sm">
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
