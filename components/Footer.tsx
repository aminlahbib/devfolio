import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Amine Lahbib</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Full-Stack Developer specializing in microservices architecture, cloud-native applications, 
              and high-performance systems.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#/" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="/#/projects" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Projects</a></li>
              <li><a href="/#/contact" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</a></li>
              <li><a href="https://github.com/aminlahbib" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-600 dark:text-slate-400">📧 amine.lhb00@gmail.com</li>
              <li className="text-slate-600 dark:text-slate-400">📍 Zweibrücken, Germany</li>
              <li>
                <a href="https://github.com/aminlahbib" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/amine-lahbib-60877321b/" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Amine Lahbib. Built with React, TypeScript, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;