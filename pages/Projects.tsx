import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Tag, X } from 'lucide-react';
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
     // Sort by count desc, then name asc
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

  // Calculate counts for badges
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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Projects" 
        description="Explore my portfolio of technical projects, featuring high-performance applications, cloud infrastructure, and open-source contributions."
        keywords={['Projects', 'Case Studies', 'Open Source', 'Applications', 'Web Development']} 
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Projects</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          A collection of projects showcasing expertise in Cloud Native architecture, 
          Frontend performance, and DevOps automation.
        </p>
      </motion.div>

      {/* Controls Container */}
      <div className="flex flex-col gap-6 mb-8">
        
        {/* Top Bar: Categories, Search, Featured Toggle */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
           
           {/* Categories */}
           <div className="flex flex-wrap gap-2 order-2 xl:order-1" role="group" aria-label="Filter by Category">
            {categories.map(cat => (
                <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    filter === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20 transform scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
                >
                {cat}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    filter === cat 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                    {getCategoryCount(cat)}
                </span>
                </button>
            ))}
            </div>

            {/* Search & Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto order-1 xl:order-2">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search projects by title or tag"
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 placeholder-slate-400 transition-colors"
                    />
                </div>
                <button
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    aria-pressed={showFeaturedOnly}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
                        showFeaturedOnly 
                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-700' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${showFeaturedOnly ? 'bg-brand-500 border-brand-500' : 'border-slate-400'}`}>
                        {showFeaturedOnly && <Star size={10} className="text-white fill-current" />}
                    </div>
                    Show Featured
                </button>
            </div>
        </div>

        {/* Tag Cloud */}
        {sortedTags.length > 0 && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-6 border-t border-slate-200 dark:border-slate-800"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-brand-500" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Filter by Tech</span>
                    {selectedTag && (
                        <button 
                            onClick={() => setSelectedTag(null)}
                            aria-label="Clear selected tag filter"
                            className="ml-auto text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                        >
                            <X size={12} /> Clear tag
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology tag">
                    {sortedTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            aria-pressed={selectedTag === tag}
                            aria-label={`Filter by ${tag}, ${tagCounts[tag]} projects`}
                            className={`group px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                                selectedTag === tag
                                ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400'
                            }`}
                        >
                            {tag}
                            <span className={`text-[10px] ${selectedTag === tag ? 'text-brand-100' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-400'}`}>
                                ({tagCounts[tag]})
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        )}

      </div>

      {/* Content */}
      {status === LoadStatus.LOADING && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
        </div>
      )}

      {status === LoadStatus.SUCCESS && (
        <motion.div 
          layout
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={item}
              >
                <ProjectCard project={project} index={0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {status === LoadStatus.SUCCESS && filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800"
        >
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">No projects found matching your criteria.</p>
          <button 
            onClick={clearAllFilters}
            className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;