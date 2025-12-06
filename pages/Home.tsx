import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Server, Layout, Database, Terminal, Code2, Cpu, Globe, Cloud, Zap, Shield, Layers } from 'lucide-react';
import { projectService } from '../services/api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';

// Magnetic button component
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await projectService.getAll();
      if (response.success && response.data) {
        setFeaturedProjects(response.data.filter(p => p.featured));
      }
    };
    fetchProjects();
  }, []);

  const features = [
    { 
      icon: <Layout className="w-6 h-6" />, 
      title: "Frontend Excellence", 
      desc: "React, TypeScript, Tailwind CSS with pixel-perfect responsive designs.",
      color: "from-pink-500 to-rose-500",
      iconBg: "bg-pink-500/10 dark:bg-pink-500/20"
    },
    { 
      icon: <Server className="w-6 h-6" />, 
      title: "Microservices", 
      desc: "Spring Boot & Rust services with distributed systems architecture.",
      color: "from-brand-500 to-violet-500",
      iconBg: "bg-brand-500/10 dark:bg-brand-500/20"
    },
    { 
      icon: <Database className="w-6 h-6" />, 
      title: "Data Systems", 
      desc: "PostgreSQL, MySQL, Redis with database-per-service patterns.",
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20"
    },
    { 
      icon: <Cloud className="w-6 h-6" />, 
      title: "Cloud Native", 
      desc: "Kubernetes, Docker, Terraform for production deployments.",
      color: "from-accent-500 to-blue-500",
      iconBg: "bg-accent-500/10 dark:bg-accent-500/20"
    },
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 size={22} />,
      color: "from-blue-500 to-indigo-500",
      skills: ["Java 21", "Rust", "TypeScript", "JavaScript", "SQL", "Python"]
    },
    {
      title: "Frontend",
      icon: <Globe size={22} />,
      color: "from-pink-500 to-rose-500",
      skills: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query", "Vite"]
    },
    {
      title: "Backend",
      icon: <Cpu size={22} />,
      color: "from-emerald-500 to-teal-500",
      skills: ["Spring Boot", "Rust (Axum)", "Microservices", "REST APIs", "WebSocket", "JWT"]
    },
    {
      title: "DevOps",
      icon: <Layers size={22} />,
      color: "from-violet-500 to-purple-500",
      skills: ["Kubernetes", "Docker", "GCP", "Terraform", "GitLab CI/CD", "Prometheus"]
    }
  ];

  const stats = [
    { value: "4+", label: "Years Experience" },
    { value: "20+", label: "Projects Shipped" },
    { value: "10+", label: "Technologies" },
    { value: "100%", label: "Remote Friendly" },
  ];

  const scrollToProjects = () => {
    const element = document.getElementById('featured-work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Home" 
        description="Full Stack Engineer specializing in microservices, cloud-native applications, and high-performance systems."
        keywords={['Full Stack Developer', 'React', 'Spring Boot', 'Rust', 'Kubernetes', 'DevOps']} 
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 max-w-4xl">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Open for Work & Collaborations
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-surface-900 dark:text-white mb-6 leading-[1.1]"
            >
              Building{' '}
              <span className="gradient-text animate-gradient">
                production-ready
              </span>
              <br />
              systems at scale
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-surface-600 dark:text-surface-400 mb-10 max-w-2xl leading-relaxed"
            >
              I craft high-performance applications with microservices architecture, 
              cloud-native deployment, and modern DevOps practices. Specializing in 
              <span className="text-surface-900 dark:text-white font-medium"> Java</span>,
              <span className="text-surface-900 dark:text-white font-medium"> Rust</span>, and
              <span className="text-surface-900 dark:text-white font-medium"> TypeScript</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                onClick={scrollToProjects}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:shadow-xl flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl bg-white dark:bg-surface-800 hover:bg-surface-50 dark:hover:bg-surface-700 text-surface-900 dark:text-white font-semibold border border-surface-200 dark:border-surface-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                Let's Talk
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-surface-200 dark:border-surface-800"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl font-bold text-surface-900 dark:text-white">{stat.value}</span>
                  <span className="text-sm text-surface-500 dark:text-surface-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] opacity-50 dark:opacity-30 pointer-events-none hidden lg:block">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/30 to-accent-500/30 rounded-full blur-3xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-2 border-dashed border-brand-500/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 border-2 border-dashed border-accent-500/20 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-4">
              What I Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
              Full-Stack Expertise
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-6 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand-500/10"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{feature.desc}</p>
                
                {/* Gradient line at bottom */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured-work" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/20 mb-4"
              >
                Portfolio
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-2"
              >
                Featured Projects
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-surface-600 dark:text-surface-400"
              >
                Selected work demonstrating technical depth and production quality.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/projects" 
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium transition-all"
              >
                View All
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 mb-4">
              Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Technical Arsenal
            </h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              A comprehensive toolbelt for shipping high-performance applications from concept to production.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-surface-800/50 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 h-full transition-all duration-300 hover:shadow-lg">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">{category.title}</h3>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 bg-surface-100 dark:bg-surface-700/50 text-surface-700 dark:text-surface-300 rounded-lg text-sm font-medium border border-surface-200 dark:border-surface-600 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-accent-500 p-12 text-center"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Let's Build Something Amazing
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                I'm always excited to work on challenging projects. Whether you need a robust backend, 
                a performant frontend, or a complete solution, let's talk.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-600 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Start a Conversation
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
