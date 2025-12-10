import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';
import { projectService } from '../services/api';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await projectService.getAll();
      if (response.success && response.data) {
        const featured = response.data.filter(p => p.featured).slice(0, 4);
        setFeaturedProjects(featured);
      }
    };
    fetchProjects();
  }, []);

  const getIcon = (label: string) => {
    const iconClass = "h-6 w-6 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-all duration-300 group-hover:scale-110";
    switch (label) {
      case 'Github':
        return <SiGithub className={iconClass} />;
      case 'LinkedIn':
        return <SiLinkedin className={iconClass} />;
      case 'Email':
        return <SiGmail className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <motion.div 
        className="w-full max-w-5xl mx-auto px-6 py-12 sm:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          
          {/* Branding Column */}
          <motion.div 
            className="flex flex-col md:justify-between md:col-span-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-1.5">
                  Amine Lahbib
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {t('footer.role')}
                </p>
              </motion.div>
              
              {/* Social Icons */}
              <motion.div 
                className="flex items-center gap-5 mt-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a 
                  href="https://www.linkedin.com/in/amine-lahbib-60877321b/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label="LinkedIn"
                >
                  {getIcon('LinkedIn')}
                </a>
                <a 
                  href="https://github.com/aminlahbib" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label="GitHub"
                >
                  {getIcon('Github')}
                </a>
                <a 
                  href="mailto:amine.lhb00@gmail.com" 
                  className="group relative"
                  aria-label="Email"
                >
                  {getIcon('Email')}
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex items-center gap-2.5 group cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
                AVAILABLE FOR WORK
              </span>
            </motion.div>
          </motion.div>
          
          {/* Links Columns */}
          <motion.div 
            className="md:col-span-3 grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-10 border-t border-neutral-200 dark:border-neutral-800 pt-10 md:border-t-0 md:pt-0 md:border-l md:border-neutral-200 dark:md:border-neutral-800 md:pl-12 lg:pl-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Navigate */}
            <motion.div 
              className="flex flex-col space-y-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">Navigate</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link 
                    to="/" 
                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit group/link"
                  >
                    <span className="relative">
                      {t('nav.home')}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 dark:bg-white group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/projects" 
                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit group/link"
                  >
                    <span className="relative">
                      {t('nav.work')}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 dark:bg-white group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit group/link"
                  >
                    <span className="relative">
                      {t('nav.contact')}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 dark:bg-white group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Projects */}
            {featuredProjects.length > 0 && (
              <motion.div 
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">Projects</h4>
                <ul className="space-y-2.5">
                  {featuredProjects.map((project, index) => (
                    <motion.li 
                      key={project.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit group/link"
                      >
                        <span className="relative">
                          {project.title}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-neutral-900 dark:bg-white group-hover/link:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
