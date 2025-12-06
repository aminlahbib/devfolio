import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// Enhanced scroll progress with gradient
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{ 
        scaleX,
        background: 'linear-gradient(90deg, #d946ef 0%, #22d3ee 50%, #d946ef 100%)',
        backgroundSize: '200% 100%',
      }}
    />
  );
};

// Page transition variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
  },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// Background decoration component
const BackgroundDecoration = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    {/* Gradient orbs */}
    <div className="absolute top-0 -left-40 w-80 h-80 bg-brand-500/20 rounded-full blur-[100px] dark:bg-brand-500/10" />
    <div className="absolute top-1/3 -right-40 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px] dark:bg-accent-500/10" />
    <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-brand-400/15 rounded-full blur-[80px] dark:bg-brand-400/5" />
    
    {/* Grid pattern */}
    <div 
      className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern bg-grid opacity-50"
      style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)' }}
    />
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollProgress />
      <BackgroundDecoration />
      <div className="relative flex flex-col min-h-screen text-surface-900 dark:text-surface-100 transition-colors duration-300">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
