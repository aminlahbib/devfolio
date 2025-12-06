import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
        setFeaturedProjects(response.data.filter(p => p.featured).slice(0, 3));
      }
    };
    fetchProjects();
  }, []);

  const expertise = [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
    { title: 'Backend', items: ['Spring Boot', 'Rust', 'Node.js'] },
    { title: 'Infrastructure', items: ['Kubernetes', 'Docker', 'Terraform'] },
    { title: 'Data', items: ['PostgreSQL', 'Redis', 'MySQL'] },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Home" 
        description="Full Stack Engineer specializing in microservices, cloud-native applications, and high-performance systems."
        keywords={['Full Stack Developer', 'React', 'Spring Boot', 'Rust', 'Kubernetes']} 
      />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-caption text-neutral-500 dark:text-neutral-400 mb-4">
              Full Stack Engineer
            </p>
            
            <h1 className="text-display text-neutral-900 dark:text-white mb-6 max-w-3xl">
              Building software that scales.
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed">
              I design and build production systems with microservices architecture, 
              cloud-native deployment, and modern development practices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-caption font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                View Work
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full text-caption font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-small text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-10">
              Expertise
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {expertise.map((area) => (
                <div key={area.title}>
                  <h3 className="text-caption font-medium text-neutral-900 dark:text-white mb-3">
                    {area.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {area.items.map((item) => (
                      <li key={item} className="text-caption text-neutral-500 dark:text-neutral-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-20 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-small text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Selected Work
            </h2>
            <Link 
              to="/projects" 
              className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors link-underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-px">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} variant="list" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-headline text-neutral-900 dark:text-white mb-4">
              Let's work together
            </h2>
            <p className="text-body text-neutral-600 dark:text-neutral-400 mb-8">
              I'm currently available for freelance projects and full-time opportunities. 
              If you're looking for a developer who cares about quality, let's talk.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-neutral-900 dark:text-white font-medium hover:gap-3 transition-all link-underline"
            >
              Start a conversation
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
