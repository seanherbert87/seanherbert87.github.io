import React from 'react';
import Section from './section';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Project } from '../types';

interface SectionProjectsProps {
  projects: Project[];
}

const SectionProjects: React.FC<SectionProjectsProps> = ({ projects }) => {
  if (!projects.length) return null;

  return (
    <Section title="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">2024</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    aria-label={`Visit ${project.name} website`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                <a
                  href={project.githubLink || "https://github.com/seanherbert87"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    index === 0 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SectionProjects;
