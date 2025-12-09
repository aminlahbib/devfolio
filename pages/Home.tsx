import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileStack } from 'lucide-react';
import { 
  SiReact, SiTypescript, SiTailwindcss, SiSpring, SiRust, SiNodedotjs, 
  SiKubernetes, SiDocker, SiTerraform, SiPostgresql, SiRedis, SiMysql,
  SiGooglecloud, SiFirebase, SiGrafana, SiPrometheus, SiGit, SiGithub, 
  SiGitlab, SiLinux, SiApachemaven, SiPython
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { projectService } from '../services/api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await projectService.getAll();
      if (response.success && response.data) {
        const featured = response.data.filter(p => p.featured).slice(0, 3);
        setFeaturedProjects(featured);
        
        // Preload featured project images
        featured.forEach(project => {
          if (project.imageUrl) {
            const img = new Image();
            img.src = project.imageUrl;
          }
        });
      }
    };
    fetchProjects();
  }, []);

  const technologyIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    // Frontend
    'React': SiReact,
    'TypeScript': SiTypescript,
    'Tailwind CSS': SiTailwindcss,
    // Backend
    'Spring Boot': SiSpring,
    'Rust': SiRust,
    'Node.js': SiNodedotjs,
    'Java': FaJava,
    'Python': SiPython,
    'Maven': SiApachemaven,
    // Infrastructure
    'Kubernetes': SiKubernetes,
    'Docker': SiDocker,
    'Terraform': SiTerraform,
    // Cloud
    'Google Cloud': SiGooglecloud,
    'Firebase': SiFirebase,
    'Grafana': SiGrafana,
    'Loki': FileStack, // Using FileStack icon for Loki (logging tool)
    'Prometheus': SiPrometheus,
    // Version Control & Tools
    'Git': SiGit,
    'GitHub': SiGithub,
    'GitLab': SiGitlab,
    'Linux': SiLinux,
    // Data
    'PostgreSQL': SiPostgresql,
    'Redis': SiRedis,
    'MySQL': SiMysql,
  };

  const technologies = [
    // Frontend
    'React', 'TypeScript', 'Tailwind CSS',
    // Backend
    'Java', 'Spring Boot', 'Python', 'Rust', 'Node.js', 'Maven',
    // Infrastructure & Cloud
    'Kubernetes', 'Docker', 'Terraform', 'Google Cloud', 'Firebase',
    // Observability
    'Grafana', 'Loki', 'Prometheus',
    // Version Control & Tools
    'Git', 'GitHub', 'GitLab', 'Linux',
    // Data
    'PostgreSQL', 'Redis', 'MySQL',
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
              {t('home.role')}
            </p>
            
            <h1 className="text-display text-neutral-900 dark:text-white mb-6 max-w-3xl">
              {t('home.title')}
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed">
              {t('home.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-caption font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
                {t('home.viewWork')}
                <ArrowRight size={16} />
              </Link>
          <Link
            to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-full text-caption font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
                {t('home.getInTouch')}
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
            <h2 className="text-small text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-10 text-center">
              {t('home.expertise')}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {technologies.map((tech, index) => {
                const TechIcon = technologyIcons[tech];
                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="group"
                  >
                    <div className="text-caption text-neutral-500 dark:text-neutral-400 transition-all duration-200 hover:text-neutral-900 dark:hover:text-white hover:translate-x-1 cursor-default flex items-center gap-2">
                      {TechIcon && (
                        <TechIcon size={16} className="text-neutral-400 dark:text-neutral-500 transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-400 flex-shrink-0" />
                      )}
                      <span>{tech}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-20 px-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-small text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {t('home.selectedWork')}
            </h2>
            <Link 
              to="/projects" 
              className="text-caption text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors link-underline"
            >
              {t('home.viewAll')}
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
              {t('home.cta.title')}
            </h2>
            <p className="text-body text-neutral-600 dark:text-neutral-400 mb-8">
              {t('home.cta.description')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-neutral-900 dark:text-white font-medium hover:gap-3 transition-all link-underline"
                    >
              {t('home.cta.startConversation')}
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
