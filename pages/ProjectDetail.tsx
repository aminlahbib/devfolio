import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Check, ChevronLeft, ChevronRight, Play, Mail, FileText } from 'lucide-react';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  // Preload images for better performance
  useEffect(() => {
    if (images.length === 0) return;
    
    // Preload current image
    const currentImg = new Image();
    currentImg.src = images[currentImageIndex];
    
    // Preload next and previous images
    const nextIndex = (currentImageIndex + 1) % images.length;
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    
    const nextImg = new Image();
    nextImg.src = images[nextIndex];
    
    const prevImg = new Image();
    prevImg.src = images[prevIndex];
    
    // Reset loaded state when image changes
    setImageLoaded(false);
    
    const handleLoad = () => setImageLoaded(true);
    currentImg.onload = handleLoad;
    
    return () => {
      currentImg.onload = null;
    };
  }, [currentImageIndex, images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (images.length <= 1) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images.length]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[currentImageIndex] && thumbnailContainerRef.current) {
      const activeThumbnail = thumbnailRefs.current[currentImageIndex];
      const container = thumbnailContainerRef.current;
      
      if (activeThumbnail) {
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = activeThumbnail.getBoundingClientRect();
        
        // Check if thumbnail is out of view
        if (thumbnailRect.left < containerRect.left) {
          // Scroll left to show thumbnail
          activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        } else if (thumbnailRect.right > containerRect.right) {
          // Scroll right to show thumbnail
          activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        }
      }
    }
  }, [currentImageIndex]);

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
          transition={{ duration: 0.25 }}
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
              {project.reportUrl && (
                <a 
                  href={project.reportUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  <FileText size={18} />
                  {t('projectDetail.viewReport')}
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
      {images.length > 0 && (
        <motion.div 
          className="px-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 w-full aspect-video bg-neutral-100 dark:bg-neutral-900 rounded-xl animate-pulse z-0" />
              )}
              
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-auto rounded-xl relative z-10"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.98 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                  />
                </AnimatePresence>

                {/* Navigation Arrows - More Visible */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-neutral-800 active:scale-95 transition-all duration-200 shadow-lg border border-neutral-200 dark:border-neutral-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-neutral-800 active:scale-95 transition-all duration-200 shadow-lg border border-neutral-200 dark:border-neutral-800 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 dark:bg-white/60 backdrop-blur-sm text-white dark:text-neutral-900 text-xs font-medium z-20">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation - Below Main Image */}
            {images.length > 1 && (
              <div 
                ref={thumbnailContainerRef}
                className="flex gap-2.5 mt-5 overflow-x-auto py-2 px-2 scrollbar-hide"
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    ref={(el) => {
                      thumbnailRefs.current[index] = el;
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-14 rounded-lg transition-all duration-200 relative p-[1px] ${
                      index === currentImageIndex
                        ? 'bg-neutral-900 dark:bg-white scale-105'
                        : 'bg-transparent opacity-50 hover:opacity-75 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <motion.section 
          className="px-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-around py-10 md:py-12 border-y border-neutral-200 dark:border-neutral-800">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <p className="text-base md:text-lg lg:text-xl font-semibold text-neutral-900 dark:text-white mb-1.5 leading-tight">
                    {metric.value}
                  </p>
                  <p className="text-[10px] md:text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider leading-tight">
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
              transition={{ duration: 0.3, delay: 0.15 }}
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
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
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
                      transition={{ duration: 0.15 }}
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
              transition={{ duration: 0.3, delay: 0.2 }}
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

            </motion.aside>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.section 
        className="px-6 mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
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
