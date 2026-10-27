import React from 'react';
import Section from './section';
import { ExternalLink, Calendar, Lock } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
import Link from 'next/link';
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
            className="bg-white/70 dark:bg-gray-900/60 rounded-md p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 transition-colors duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 mr-2 shrink-0" strokeWidth={1.5} />
                  <span className="font-mono text-xs">{project.year}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm text-gray-600 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                    aria-label={`Visit ${project.name} website`}
                  >
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm text-gray-600 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
                    aria-label="View source code on GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.caseStudy && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 border border-gray-200 dark:border-gray-800 rounded-sm font-mono text-xs text-gray-600 dark:text-gray-400">
                    <Lock className="w-3 h-3" aria-hidden="true" />
                    Case study
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            
            {project.caseStudyPath && (
              <Link
                href={project.caseStudyPath}
                className="inline-block mb-4 font-mono text-xs text-primary-700 dark:text-primary-300 hover:underline"
              >
                Read the case study →
              </Link>
            )}

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-2.5 py-1 border border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 rounded-sm font-mono text-xs"
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
