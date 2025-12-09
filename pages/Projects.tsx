import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projectService } from '../services/api';
import { Project, LoadStatus } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [filter, setFilter] = useState('All');
  const { t } = useLanguage();

  const categories = [
    { key: 'All', label: t('projects.filter.all') },
    { key: 'Full Stack', label: t('projects.filter.fullStack') },
    { key: 'Frontend', label: t('projects.filter.frontend') },
    { key: 'Backend', label: t('projects.filter.backend') },
    { key: 'DevOps', label: t('projects.filter.devOps') },
  ];

  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [projects]);

  // Get stats
  const stats = useMemo(() => {
    return {
      total: projects.length,
      technologies: allTags.length,
      featured: projects.filter(p => p.featured).length
    };
  }, [projects, allTags]);

  useEffect(() => {
    const loadProjects = async () => {
      setStatus(LoadStatus.LOADING);
      const response = await projectService.getAll();
      if (response.success && response.data) {
        setProjects(response.data);
        setFilteredProjects(response.data);
        setStatus(LoadStatus.SUCCESS);
      } else {
        setStatus(LoadStatus.ERROR);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  }, [filter, projects]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <SEO 
        title="Work" 
        description="Selected projects showcasing expertise in full-stack development, cloud infrastructure, and system design."
        keywords={['Projects', 'Portfolio', 'Web Development', 'Software Engineering']} 
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        className="mb-12"
      >
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {t('projects.subtitle')}
          </p>
          
          {/* Stats */}
          {status === LoadStatus.SUCCESS && (
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.total}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{t('projects.stats.projects')}</span>
              </div>
              <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.technologies}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{t('projects.stats.technologies')}</span>
              </div>
              <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.featured}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{t('projects.stats.featured')}</span>
              </div>
            </div>
          )}
      </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10"
        >
          <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0">
            {categories.map(cat => (
                <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === cat.key
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
                >
                {cat.label}
                {filter === cat.key && filteredProjects.length > 0 && (
                  <span className="ml-1.5 text-neutral-400 dark:text-neutral-500">
                    ({filteredProjects.length})
                </span>
                )}
                        </button>
                    ))}
                </div>
            </motion.div>

        {/* Loading */}
      {status === LoadStatus.LOADING && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
        </div>
      )}

        {/* Grid */}
      {status === LoadStatus.SUCCESS && (
        <motion.div 
          layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14"
        >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <ProjectCard project={project} variant="grid" />
              </motion.div>
            ))}
        </motion.div>
      )}

        {/* Empty */}
      {status === LoadStatus.SUCCESS && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-body text-neutral-500 dark:text-neutral-400 mb-4">
              {t('projects.empty')}
            </p>
            <button
              onClick={() => setFilter('All')}
              className="text-sm text-neutral-900 dark:text-white underline underline-offset-4"
            >
              {t('projects.viewAll')}
            </button>
          </div>
        )}

        {/* Technologies Used */}
        {status === LoadStatus.SUCCESS && allTags.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800"
        >
            <h2 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-5">
              {t('projects.technologiesUsed')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 rounded-full"
          >
                  {tag}
                </span>
              ))}
            </div>
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default Projects;
