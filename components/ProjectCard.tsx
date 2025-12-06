import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Users, Star } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Frontend':
      return {
        bg: 'bg-pink-500/10 dark:bg-pink-500/20',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-500/20',
        dot: 'bg-pink-500'
      };
    case 'Backend':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/20',
        dot: 'bg-emerald-500'
      };
    case 'DevOps':
      return {
        bg: 'bg-violet-500/10 dark:bg-violet-500/20',
        text: 'text-violet-600 dark:text-violet-400',
        border: 'border-violet-500/20',
        dot: 'bg-violet-500'
      };
    case 'Full Stack':
      return {
        bg: 'bg-brand-500/10 dark:bg-brand-500/20',
        text: 'text-brand-600 dark:text-brand-400',
        border: 'border-brand-500/20',
        dot: 'bg-brand-500'
      };
    default:
      return {
        bg: 'bg-surface-100 dark:bg-surface-800',
        text: 'text-surface-600 dark:text-surface-400',
        border: 'border-surface-200 dark:border-surface-700',
        dot: 'bg-surface-500'
      };
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const categoryStyle = getCategoryStyle(project.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden transition-all duration-500 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 dark:hover:shadow-brand-500/5">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-100 dark:bg-surface-800">
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-surface-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Quick Actions - visible on hover */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <div className="flex gap-2">
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm text-surface-700 dark:text-surface-200 hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-lg"
                >
                  <Github size={18} />
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm text-surface-700 dark:text-surface-200 hover:bg-white dark:hover:bg-surface-700 transition-colors shadow-lg"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            
            <Link
              to={`/projects/${project.slug}`}
              className="px-4 py-2 rounded-xl bg-white dark:bg-surface-800 text-surface-900 dark:text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5"
            >
              View Details
              <ArrowUpRight size={14} />
            </Link>
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/90 backdrop-blur-sm text-white text-xs font-medium shadow-lg">
                <Star size={12} className="fill-current" />
                Featured
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Category & Icons Row */}
          <div className="flex items-center justify-between mb-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
              {project.category}
            </div>
            
            {project.usedBy && project.usedBy.length > 0 && (
              <div className="relative group/tooltip">
                <button 
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400 transition-colors"
                  aria-label="See who uses this"
                >
                  <Users size={16} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-xl p-4 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 transform origin-top-right">
                  <div className="text-xs font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2 pb-2 border-b border-surface-100 dark:border-surface-700">
                    <Users size={12} className="text-brand-500" /> Used By
                  </div>
                  <ul className="space-y-2">
                    {project.usedBy.map((entity, i) => (
                      <li key={i} className="text-xs text-surface-600 dark:text-surface-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-500 flex-shrink-0" />
                        {entity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed mb-5 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 4).map(tag => (
              <span 
                key={tag} 
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-100 dark:bg-surface-700/50 text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-600"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 rounded-md text-xs font-medium text-surface-500 dark:text-surface-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Metrics Preview */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex items-center gap-4 pt-4 border-t border-surface-100 dark:border-surface-700">
              {project.metrics.slice(0, 2).map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{metric.value}</span>
                  <span className="text-xs text-surface-500 dark:text-surface-500">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Bottom gradient line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.article>
  );
};

export default ProjectCard;
