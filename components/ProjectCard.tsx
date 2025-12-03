import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, Users } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Frontend':
      return 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-500/20';
    case 'Backend':
      return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/20';
    case 'DevOps':
      return 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-500/20';
    case 'Full Stack':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/20';
    default:
      return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-brand-500/10 dark:hover:shadow-brand-900/20 hover:z-10"
    >
      <div className="aspect-video w-full relative bg-slate-100 dark:bg-slate-800 rounded-t-xl">
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-xl transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-mono px-2 py-1 rounded border ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
          <div className="flex gap-3">
            {project.usedBy && project.usedBy.length > 0 && (
              <div className="relative group/tooltip flex items-center">
                <button 
                  className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 transition-colors" 
                  aria-label="See who uses this"
                >
                  <Users size={18} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-3 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 transform origin-top-right">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1 border-b border-slate-100 dark:border-slate-800 pb-1">
                    <Users size={12} className="text-violet-500" /> Used By
                  </div>
                  <ul className="space-y-1.5">
                    {project.usedBy.map((entity, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-500 flex-shrink-0" />
                        {entity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Github size={18} />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs text-slate-500 px-2 py-1">+ {project.tags.length - 3}</span>
          )}
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
        >
          View Details <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;