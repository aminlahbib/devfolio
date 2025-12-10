import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, FileText, Globe, Terminal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const langMenuRefDesktop = useRef<HTMLDivElement>(null);
  const langMenuRefMobile = useRef<HTMLDivElement>(null);
  
  const text = 'devfolio';

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // SSH-style typing animation
  useEffect(() => {
    setDisplayedText('');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  // Blinking cursor animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickOutsideDesktop = langMenuRefDesktop.current && !langMenuRefDesktop.current.contains(event.target as Node);
      const isClickOutsideMobile = langMenuRefMobile.current && !langMenuRefMobile.current.contains(event.target as Node);
      
      if (isClickOutsideDesktop && isClickOutsideMobile) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const links = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.work') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'en' as const, label: 'English' },
    { code: 'de' as const, label: 'Deutsch' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-base font-mono font-medium text-neutral-900 dark:text-white hover:opacity-80 transition-opacity group">
            <Terminal size={18} className="text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
            <span className="inline-block">
              {displayedText}
              <span className={`inline-block w-0.5 h-4 ml-0.5 bg-neutral-900 dark:bg-white transition-opacity duration-300 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </span>
          </Link>
          
          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm transition-colors ${
                  isActive(link.path)
                    ? 'text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <FileText size={16} className="flex-shrink-0" />
              <span>{t('nav.cv')}</span>
            </a>
            
            <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 mx-1" />
            
            <div className="relative" ref={langMenuRefDesktop}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                aria-label="Select language"
              >
                <Globe size={18} />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                          language === lang.code
                            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <span>{lang.label}</span>
                        {language === lang.code && (
                          <span className="text-xs font-medium">✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              aria-label={t('nav.toggleTheme')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label={t('nav.downloadCv')}
            >
              <FileText size={18} />
            </a>
            <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800" />
            <div className="relative" ref={langMenuRefMobile}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Select language"
              >
                <Globe size={18} />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                          language === lang.code
                            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <span>{lang.label}</span>
                        {language === lang.code && (
                          <span className="text-xs font-medium">✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label={t('nav.toggleTheme')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-body ${
                    isActive(link.path)
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
                      <a 
                href="/cv.pdf"
                        target="_blank" 
                        rel="noopener noreferrer" 
                className="flex items-center gap-2 py-2 text-body text-neutral-500 dark:text-neutral-400"
                      >
                <FileText size={16} />
                {t('nav.downloadCv')}
                      </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
