import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DevFolio. Built with React, Tailwind, and Framer Motion.</p>
        <p className="mt-2 text-xs">Simulating Bun + Elysia Backend Environment</p>
      </div>
    </footer>
  );
};

export default Footer;