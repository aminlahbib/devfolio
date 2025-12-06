import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Home', href: '/#/' },
      { name: 'Projects', href: '/#/projects' },
      { name: 'Contact', href: '/#/contact' },
    ],
    social: [
      { name: 'GitHub', href: 'https://github.com/aminlahbib', icon: Github },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/amine-lahbib-60877321b/', icon: Linkedin },
      { name: 'Email', href: 'mailto:amine.lhb00@gmail.com', icon: Mail },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  };

  return (
    <footer className="relative mt-auto border-t border-surface-200 dark:border-surface-800 bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-surface-900 dark:text-white">
                Amine Lahbib
              </span>
            </Link>
            
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md leading-relaxed">
              Full-Stack Developer specializing in microservices architecture, cloud-native applications, 
              and high-performance systems. Building production-ready solutions from concept to deployment.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-500/10 dark:hover:bg-brand-500/10 transition-all"
                  aria-label={item.name}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="group inline-flex items-center text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight size={14} className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="https://github.com/aminlahbib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={14} className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-surface-600 dark:text-surface-400">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0 text-brand-500" />
                <a 
                  href="mailto:amine.lhb00@gmail.com"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all"
                >
                  amine.lhb00@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 text-brand-500">📍</span>
                <span>Zweibrücken, Germany</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 text-emerald-500">✓</span>
                <span>Remote Friendly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-200 dark:border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-surface-500 dark:text-surface-500 flex items-center gap-1.5">
              <span>&copy; {currentYear} Amine Lahbib.</span>
              <span className="hidden sm:inline">Built with</span>
              <Heart size={14} className="hidden sm:inline text-red-500 fill-current" />
              <span className="hidden sm:inline">and</span>
              <span className="hidden sm:inline text-surface-600 dark:text-surface-400">lots of coffee</span>
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {navigation.technologies.map((tech, idx) => (
                <span 
                  key={tech}
                  className="text-xs text-surface-400 dark:text-surface-500"
                >
                  {tech}{idx < navigation.technologies.length - 1 && <span className="ml-2">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
