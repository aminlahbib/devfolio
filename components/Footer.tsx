import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-body text-neutral-900 dark:text-white font-medium mb-1">
              Amine Lahbib
            </p>
            <p className="text-caption text-neutral-500 dark:text-neutral-400">
              Full Stack Engineer
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-6">
            <a href="/#/" className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Home
            </a>
            <a href="/#/projects" className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Work
            </a>
            <a href="/#/contact" className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <a 
              href="https://github.com/aminlahbib" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              GitHub
                </a>
            <a 
              href="https://www.linkedin.com/in/amine-lahbib-60877321b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
                </a>
          </nav>
        </div>
        
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-small text-neutral-400 dark:text-neutral-500">
            © {currentYear} Amine Lahbib
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
