import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Activity, Users, Tag, ArrowUpRight, Zap, ChevronRight } from 'lucide-react';
import { projectService } from '../services/api';
import { Project, LoadStatus } from '../types';
import SEO from '../components/SEO';

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'Frontend':
      return {
        bg: 'bg-pink-500/10 dark:bg-pink-500/20',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-500/20',
        gradient: 'from-pink-500 to-rose-500'
      };
    case 'Backend':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/20',
        gradient: 'from-emerald-500 to-teal-500'
      };
    case 'DevOps':
      return {
        bg: 'bg-violet-500/10 dark:bg-violet-500/20',
        text: 'text-violet-600 dark:text-violet-400',
        border: 'border-violet-500/20',
        gradient: 'from-violet-500 to-purple-500'
      };
    case 'Full Stack':
      return {
        bg: 'bg-brand-500/10 dark:bg-brand-500/20',
        text: 'text-brand-600 dark:text-brand-400',
        border: 'border-brand-500/20',
        gradient: 'from-brand-500 to-accent-500'
      };
    default:
      return {
        bg: 'bg-surface-100 dark:bg-surface-800',
        text: 'text-surface-600 dark:text-surface-400',
        border: 'border-surface-200 dark:border-surface-700',
        gradient: 'from-surface-500 to-surface-600'
      };
  }
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      setStatus(LoadStatus.LOADING);
      const response = await projectService.getBySlug(slug);
      if (response.success && response.data) {
        setProject(response.data);
        setStatus(LoadStatus.SUCCESS);
      } else {
        setStatus(LoadStatus.ERROR);
      }
    };
    loadProject();
  }, [slug]);

  if (status === LoadStatus.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-surface-200 dark:border-surface-700" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!project || status === LoadStatus.ERROR) {
    return (
      <div className="min-h-screen pt-32 px-4 text-center">
        <SEO title="Project Not Found" description="The requested project could not be found." />
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">Project not found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const categoryStyle = getCategoryStyle(project.category);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <SEO 
        title={project.title} 
        description={project.shortDescription}
        image={project.imageUrl}
        keywords={project.tags}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 mb-8"
        >
          <Link to="/projects" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Projects
          </Link>
          <ChevronRight size={14} />
          <span className="text-surface-900 dark:text-white font-medium truncate">{project.title}</span>
        </motion.nav>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border} mb-4`}>
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryStyle.gradient}`} />
              {project.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-4 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
              {project.shortDescription}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-surface-900 dark:bg-white text-white dark:text-surface-900 rounded-xl font-medium hover:bg-surface-800 dark:hover:bg-surface-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Github size={20} />
                  View Repository
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white rounded-xl font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <ExternalLink size={20} />
                  Live Demo
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Main Image */}
          <motion.div 
            variants={itemVariants}
            className="rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 shadow-2xl mb-12 bg-surface-100 dark:bg-surface-800"
          >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          {/* Metrics Section */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-brand-500/10 dark:bg-brand-500/20">
                  <Activity className="text-brand-600 dark:text-brand-400" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Key Metrics
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {project.metrics.map((metric, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="relative group bg-white dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 p-5 rounded-2xl text-center hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all hover:shadow-lg"
                  >
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      {metric.label}
                    </div>
                    {/* Gradient accent */}
                    <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${categoryStyle.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-full`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-500/10 dark:bg-accent-500/20">
                <Zap className="text-accent-600 dark:text-accent-400" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                About the Project
              </h2>
            </div>
            
            <div className="prose prose-lg prose-surface dark:prose-invert max-w-none">
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-violet-500/10 dark:bg-violet-500/20">
                <Tag className="text-violet-600 dark:text-violet-400" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                Technologies Used
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Used By Section */}
          {project.usedBy && project.usedBy.length > 0 && (
            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
                  <Users className="text-emerald-600 dark:text-emerald-400" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Use Cases & Applications
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.usedBy.map((entity, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-4 p-5 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex-shrink-0" />
                    <span className="text-surface-700 dark:text-surface-300">{entity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back to Projects */}
          <motion.div variants={itemVariants} className="pt-8 border-t border-surface-200 dark:border-surface-800">
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back to all projects
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
