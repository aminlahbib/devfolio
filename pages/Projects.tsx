import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Tag, X, Filter, Grid3X3, LayoutList } from 'lucide-react';
import { projectService } from '../services/api';
import { Project, LoadStatus } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'DevOps'];

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

  // Derive all unique tags from projects with counts
  const tagCounts = projects.flatMap(p => p.tags).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTags = Object.keys(tagCounts).sort((a, b) => {
    const countDiff = tagCounts[b] - tagCounts[a];
    return countDiff !== 0 ? countDiff : a.localeCompare(b);
  });

  useEffect(() => {
    let result = projects;

    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }

    if (showFeaturedOnly) {
      result = result.filter(p => p.featured);
    }

    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(result);
  }, [filter, searchTerm, showFeaturedOnly, selectedTag, projects]);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return projects.length;
    return projects.filter(p => p.category === cat).length;
  };

  const clearAllFilters = () => {
    setFilter('All');
    setSearchTerm('');
    setShowFeaturedOnly(false);
    setSelectedTag(null);
  };

  const hasActiveFilters = filter !== 'All' || searchTerm || showFeaturedOnly || selectedTag;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <SEO 
        title="Projects" 
        description="Explore my portfolio of technical projects, featuring high-performance applications, cloud infrastructure, and open-source contributions."
        keywords={['Projects', 'Case Studies', 'Open Source', 'Applications', 'Web Development']} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/20 mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
            Projects
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl">
            A collection of projects showcasing expertise in Cloud Native architecture, 
            high-performance systems, and modern development practices.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 space-y-6"
        >
          {/* Top Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search projects"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-xl text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 placeholder-surface-400 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Actions */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Featured Toggle */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                aria-pressed={showFeaturedOnly}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  showFeaturedOnly 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' 
                    : 'bg-white dark:bg-surface-800/50 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'
                }`}
              >
                <Star size={16} className={showFeaturedOnly ? 'fill-current' : ''} />
                <span className="hidden sm:inline">Featured</span>
              </button>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  showFilters
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30'
                    : 'bg-white dark:bg-surface-800/50 text-surface-600 dark:text-surface-400 border-surface-200 dark:border-surface-700'
                }`}
              >
                <Filter size={16} />
                Filters
              </button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
                >
                  <X size={16} />
                  <span className="hidden sm:inline">Clear</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by Category">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    filter === cat
                      ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25'
                      : 'bg-white dark:bg-surface-800/50 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
                  }`}
                >
                  {cat}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    filter === cat 
                      ? 'bg-white/20 text-white' 
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                  }`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tag Cloud */}
          {sortedTags.length > 0 && (
            <div className={`${showFilters ? 'block' : 'hidden lg:block'} pt-6 border-t border-surface-200 dark:border-surface-800`}>
              <div className="flex items-center gap-2 mb-4">
                <Tag size={16} className="text-brand-500" />
                <span className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider">Technologies</span>
                {selectedTag && (
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className="ml-auto text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
                {sortedTags.slice(0, 15).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    aria-pressed={selectedTag === tag}
                    className={`group px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 ${
                      selectedTag === tag
                        ? 'bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/20'
                        : 'bg-surface-50 dark:bg-surface-800/50 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400'
                    }`}
                  >
                    {tag}
                    <span className={`text-[10px] ${selectedTag === tag ? 'text-white/80' : 'text-surface-400 dark:text-surface-500'}`}>
                      {tagCounts[tag]}
                    </span>
                  </button>
                ))}
                {sortedTags.length > 15 && (
                  <span className="px-3 py-1.5 text-xs text-surface-400">
                    +{sortedTags.length - 15} more
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Showing <span className="font-semibold text-surface-900 dark:text-white">{filteredProjects.length}</span> of {projects.length} projects
          </p>
        </motion.div>

        {/* Loading State */}
        {status === LoadStatus.LOADING && (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-surface-200 dark:border-surface-700" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {status === LoadStatus.SUCCESS && filteredProjects.length > 0 && (
          <motion.div 
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {status === LoadStatus.SUCCESS && filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
              <Search size={32} className="text-surface-400 dark:text-surface-500" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-md mx-auto">
              No projects match your current filters. Try adjusting your search criteria or clearing filters.
            </p>
            <button 
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
            >
              <X size={16} />
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
