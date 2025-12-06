import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Layout, Database, Terminal, Download, Code2, Cpu, Globe, Cloud } from 'lucide-react';
import { projectService } from '../services/api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';

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
    { icon: <Layout className="text-pink-500" size={32} />, title: "Modern Frontend", desc: "Vite, React, Tailwind & Framer Motion for buttery smooth UIs." },
    { icon: <Server className="text-brand-500" size={32} />, title: "High-Perf Backend", desc: "Powered by Bun runtime & ElysiaJS for low-latency APIs." },
    { icon: <Database className="text-emerald-500" size={32} />, title: "Data Persistence", desc: "Type-safe database interactions with Prisma ORM & SQLite." },
    { icon: <Terminal className="text-violet-500" size={32} />, title: "DevOps Ready", desc: "Dockerized & CI/CD pipeline integrated for automated delivery." },
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 size={24} className="text-blue-500" />,
      skills: ["TypeScript", "JavaScript", "Python", "SQL", "Go", "HTML/CSS"]
    },
    {
      title: "Frontend",
      icon: <Globe size={24} className="text-pink-500" />,
      skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "Zustand"]
    },
    {
      title: "Backend",
      icon: <Cpu size={24} className="text-emerald-500" />,
      skills: ["Bun", "Node.js", "ElysiaJS", "Express", "GraphQL", "gRPC"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud size={24} className="text-violet-500" />,
      skills: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform", "Nginx"]
    }
  ];

  const scrollToProjects = () => {
    const element = document.getElementById('featured-work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-16 min-h-screen">
      <SEO 
        title="Home" 
        description="A high-performance portfolio for a Senior Full Stack Engineer, featuring project showcases, technical skills, and Cloud Native expertise."
        keywords={['Full Stack Developer', 'React', 'Bun', 'Elysia', 'Portfolio', 'Software Engineer', 'DevOps']} 
      />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center snap-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
        >
          <span className="text-brand-600 dark:text-brand-400 font-mono text-sm">Open for Work & Collaborations</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
        >
          Full Stack Engineering <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-violet-600 dark:from-brand-400 dark:to-violet-500">
            Redefined for Speed.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-10"
        >
          I build scalable web applications using the latest performant technologies.
          Specializing in the Bun ecosystem, React, and Cloud Native architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all shadow-lg shadow-brand-500/20"
          >
            View Projects
          </button>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 transition-all"
          >
            Contact Me
          </Link>
          <a
            href="https://github.com/aminlahbib"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            View Resume
          </a>
        </motion.div>
      </section>

      {/* Tech Stack Grid */}
      <section className="bg-slate-50 dark:bg-slate-800/30 border-y border-slate-200 dark:border-slate-800 py-16 transition-colors duration-300 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="featured-work" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 snap-start">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Featured Work</h2>
            <p className="text-slate-600 dark:text-slate-400">Selected projects demonstrating technical depth.</p>
          </div>
          <Link to="/projects" className="hidden sm:flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 font-medium">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center sm:hidden">
           <Link to="/projects" className="text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 font-medium">
            View All Projects &rarr;
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A comprehensive toolbelt built for shipping high-performance applications from concept to production.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;