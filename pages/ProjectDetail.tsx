import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Activity, Users } from 'lucide-react';
import { projectService } from '../services/api';
import { Project, LoadStatus } from '../types';
import SEO from '../components/SEO';

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (!project || status === LoadStatus.ERROR) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <SEO title="Project Not Found" description="The requested project could not be found." />
        <h2 className="text-2xl text-slate-900 dark:text-white mb-4">Project not found</h2>
        <Link to="/projects" className="text-brand-600 dark:text-brand-400 hover:underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO 
        title={project.title} 
        description={project.shortDescription}
        image={project.imageUrl}
        keywords={project.tags}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/projects" className="inline-flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <span className={`text-sm font-mono border px-3 py-1 rounded-full ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4">
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white transition-colors border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none"
                >
                  <Github size={20} /> Repository
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 rounded-lg hover:bg-brand-500 text-white transition-colors shadow-lg shadow-brand-500/20"
                >
                  <ExternalLink size={20} /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Main Image - Animated */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl mb-12 bg-slate-100 dark:bg-slate-800"
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
            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Activity className="text-brand-500" size={24} />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.metrics.map((metric, i) => (
                  <div 
                    key={i} 
                    className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-all dark:shadow-none group"
                  >
                    <div className="text-3xl font-extrabold text-brand-600 dark:text-brand-400 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-12">
            <h3 className="text-slate-900 dark:text-white">About the Project</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Tech Stack - Animated */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border-t border-slate-200 dark:border-slate-800 pt-8 mb-8"
          >
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Used By Section */}
          {project.usedBy && project.usedBy.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-t border-slate-200 dark:border-slate-800 pt-8"
            >
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="text-violet-500" size={20} />
                Used By
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.usedBy.map((entity, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold">{entity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;