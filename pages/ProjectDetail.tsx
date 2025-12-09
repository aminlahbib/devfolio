import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Check, ChevronLeft, ChevronRight, Play, Mail } from 'lucide-react';
import { projectService } from '../services/api';
import { Project, LoadStatus } from '../types';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      setStatus(LoadStatus.LOADING);
      const response = await projectService.getBySlug(slug);
      if (response.success && response.data) {
        setProject(response.data);
        setStatus(LoadStatus.SUCCESS);
        // Set first tab as active if tabs exist
        if (response.data.tabs && response.data.tabs.length > 0) {
          setActiveTab(response.data.tabs[0].id);
        }
      } else {
        setStatus(LoadStatus.ERROR);
      }
    };
    loadProject();
  }, [slug]);

  const images = project 
    ? (project.imageUrl 
        ? [project.imageUrl, ...(project.images || [])]
        : (project.images || []))
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (status === LoadStatus.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!project || status === LoadStatus.ERROR) {
    return (
      <div className="min-h-screen pt-28 px-6 text-center">
        <SEO title="Not Found" description="Project not found." />
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">{t('projectDetail.notFound')}</h2>
        <Link to="/projects" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
          {t('projectDetail.backToWork')}
        </Link>
      </div>
    );
  }

  const activeTabContent = project.tabs?.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen pt-28 pb-24">
      <SEO 
        title={project.title} 
        description={project.shortDescription}
        image={project.imageUrl}
        keywords={project.tags}
      />
      
      {/* Hero Section */}
      <div className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-12"
            >
              <ArrowLeft size={16} />
              {t('projectDetail.backToProjects')}
        </Link>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <span className="inline-block text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-full text-sm font-medium text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Github size={18} />
                  {t('projectDetail.viewRepository')}
                </a>
              )}
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  <ExternalLink size={18} />
                  {t('projectDetail.liveDemo')}
                </a>
              )}
              <Link
                to="/contact"
                state={{ subject: `Demo Request: ${project.title}` }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
              >
                <Play size={18} />
                {t('projectDetail.requestDemo')}
              </Link>
            </div>
          </motion.div>
            </div>
          </div>

      {/* Image Gallery */}
          <motion.div 
        className="px-6 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-transparent shadow-sm">
            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              loading="lazy"
            />
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-neutral-800 transition-colors shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-neutral-800 transition-colors shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-3 px-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? 'ring-2 ring-neutral-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-neutral-950'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
          </div>
      </motion.div>

      {/* Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <motion.section 
          className="px-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-10 border-y border-neutral-200 dark:border-neutral-800">
              {project.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Main Content */}
      <div className="px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Tabbed Content - Main Column */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Tabs */}
              {project.tabs && project.tabs.length > 0 ? (
                <>
                  <div className="flex gap-1 mb-8 overflow-x-auto pb-2 border-b border-neutral-200 dark:border-neutral-800">
                    {project.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all relative ${
                          activeTab === tab.id
                            ? 'text-neutral-900 dark:text-white'
                            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="prose prose-neutral dark:prose-invert max-w-none"
                    >
                      {activeTabContent?.content.split('\n\n').map((paragraph, i) => {
                        // Check if paragraph contains bold text (markdown-like)
                        if (paragraph.includes('**')) {
                          const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                          return (
                            <p key={i} className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                              {parts.map((part, j) => 
                                j % 2 === 1 ? (
                                  <strong key={j} className="font-semibold text-neutral-900 dark:text-white">{part}</strong>
                                ) : (
                                  <span key={j}>{part}</span>
                                )
                              )}
                            </p>
                          );
                        }
                        return (
                          <p key={i} className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                            {paragraph.trim()}
                          </p>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                // Fallback to full description if no tabs
                <>
                  <h2 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-6">
                    {t('projectDetail.overview')}
                  </h2>
                  <div className="space-y-6">
                    {project.fullDescription.trim().split('\n\n').filter(p => p.trim()).map((paragraph, i) => (
                      <p key={i} className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                ))}
              </div>
                </>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside 
              className="lg:col-span-1 space-y-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Key Highlights */}
              {project.usedBy && project.usedBy.length > 0 && (
                <div>
                  <h2 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-5">
                    {t('projectDetail.keyHighlights')}
                  </h2>
                  <ul className="space-y-3">
                    {project.usedBy.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center">
                          <Check size={10} className="text-white dark:text-neutral-900" />
                        </span>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h2 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-5">
                  {t('projectDetail.techStack')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-700 dark:text-neutral-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-5">
                  {t('projectDetail.links')}
                </h2>
                <div className="space-y-2">
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      {t('projectDetail.githubRepository')}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} />
                      {t('projectDetail.liveDemo')}
                    </a>
                  )}
                  <Link 
                    to="/contact"
                    state={{ subject: `Demo Request: ${project.title}` }}
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <Mail size={16} />
                    {t('projectDetail.requestDemo')}
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.section 
        className="px-6 mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto py-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-1">
                {t('projectDetail.interested')}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('projectDetail.interestedDescription')}
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/contact"
                state={{ subject: `Demo Request: ${project.title}` }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
              >
                <Play size={16} />
                {t('projectDetail.requestDemo')}
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                {t('projectDetail.getInTouch')}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectDetail;
