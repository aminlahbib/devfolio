import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  variant?: 'list' | 'grid';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'grid' }) => {
  const { t } = useLanguage();
  
  if (variant === 'list') {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group block py-6 border-b border-neutral-200 dark:border-neutral-800 first:border-t"
      >
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-title text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                {project.title}
              </h3>
              <span className="text-small text-neutral-400 dark:text-neutral-500 font-mono">
                {project.category}
              </span>
            </div>
            <p className="text-body text-neutral-600 dark:text-neutral-400 line-clamp-2 max-w-2xl">
              {project.shortDescription}
            </p>
          </div>
          <ArrowUpRight 
            size={20} 
            className="flex-shrink-0 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors mt-1" 
          />
        </div>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link to={`/projects/${project.slug}`} className="block">
        {/* Image */}
        <div className="aspect-[4/3] mb-5 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
        />
      </div>
      
        {/* Content */}
        <div className="space-y-3">
          {/* Title & Category */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {project.title}
            </h3>
            <span className="flex-shrink-0 px-2.5 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 rounded-full">
            {project.category}
          </span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 4).map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 rounded border border-neutral-200/50 dark:border-neutral-800/50"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-[11px] text-neutral-400 dark:text-neutral-500">
                +{project.tags.length - 4}
              </span>
            )}
                  </div>
          
          {/* Metrics Preview */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex items-center gap-4 pt-2">
              {project.metrics.slice(0, 3).map((metric, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    {metric.label}
                  </span>
                </div>
              ))}
              </div>
            )}
        </div>
      </Link>
      
      {/* External Links */}
      {(project.repoUrl || project.demoUrl) && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-900">
            {project.repoUrl && (
            <a 
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Github size={14} />
              <span>{t('projectCard.source')}</span>
              </a>
            )}
            {project.demoUrl && (
            <a 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              <span>{t('projectCard.demo')}</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
