import { Project } from '../types';

/**
 * Portfolio Projects Data
 * 
 * This file contains all project data for the portfolio website.
 * Update this file to add new projects or modify existing ones.
 */

export const projects: Project[] = [
  {
    id: '1',
    slug: 'cloud-secrets-manager',
    title: 'Cloud Secrets Manager',
    shortDescription: 'Enterprise-grade secrets management platform with microservices architecture, complete observability, and security-first design.',
    fullDescription: `
      An enterprise-grade secrets management platform demonstrating end-to-end ownership from design to deployment.
      
      Built with a 3-tier microservices architecture using Java 21/Spring Boot 3.3.5, featuring event-driven 
      communication via Google Pub/Sub. The platform includes comprehensive security measures (AES-256-GCM encryption, 
      TOTP-based 2FA, JWT authentication), production-grade observability (Prometheus, Grafana, Loki), and complete 
      Infrastructure as Code using Terraform and Helm.
      
      Key highlights include 80%+ test coverage, 17,000+ lines of technical documentation, and optimized cloud costs 
      achieving 31% reduction. The system scores 7.2/10 on production readiness assessment.
    `,
    tags: [
      'Java 21',
      'Spring Boot',
      'React 18',
      'TypeScript',
      'PostgreSQL',
      'Kubernetes',
      'Terraform',
      'GCP',
      'Microservices',
      'Docker',
      'Prometheus',
      'Grafana'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop', // Security/Secrets theme
    repoUrl: 'https://github.com/aminlahbib/Cloud-Secrets-Manager',
    demoUrl: '', // Optional: Add if you have a live demo
    featured: true,
    metrics: [
      {
        label: 'Production Readiness',
        value: '7.2/10'
      },
      {
        label: 'Test Coverage',
        value: '80%+'
      },
      {
        label: 'Documentation',
        value: '17K+ lines'
      },
      {
        label: 'Microservices',
        value: '3'
      },
      {
        label: 'Cost Optimization',
        value: '31%'
      },
      {
        label: 'Security Score',
        value: '8.0/10'
      }
    ],
    usedBy: [
      'Demonstrates enterprise-grade development practices',
      'Production-ready Kubernetes deployment',
      'Complete observability stack',
      'Comprehensive security implementation'
    ]
  },
  {
    id: '2',
    slug: 'equipment-management-system',
    title: 'Equipment Management System',
    shortDescription: 'Full-stack equipment loan management system with Spring Boot backend, Kubernetes orchestration, and optimized containerization.',
    fullDescription: `
      A cloud-native equipment loan management system demonstrating end-to-end development and deployment capabilities.
      
      Features a RESTful API built with Spring Boot and JWT authentication, serving 10+ endpoints for equipment and 
      user management. The application showcases DevOps best practices with multi-stage Docker builds (achieving 60% 
      image size reduction), Kubernetes deployment with auto-scaling, health checks, and persistent storage.
      
      Includes comprehensive security measures (password hashing, CORS, container hardening) and detailed technical 
      documentation covering Docker, Kubernetes, and deployment workflows. The system is production-ready and 
      deployable to any Kubernetes cluster (Minikube, EKS, GKE).
    `,
    tags: [
      'Java 17',
      'Spring Boot',
      'Spring Security',
      'MySQL',
      'Docker',
      'Kubernetes',
      'NGINX',
      'JWT',
      'Maven',
      'DevOps'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop', // Equipment/Management theme
    repoUrl: 'https://github.com/aminlahbib/Equipment-Managment-System',
    demoUrl: '',
    featured: true,
    metrics: [
      {
        label: 'Image Optimization',
        value: '60%'
      },
      {
        label: 'API Endpoints',
        value: '10+'
      },
      {
        label: 'Database Tables',
        value: '4'
      },
      {
        label: 'K8s Replicas',
        value: '3'
      },
      {
        label: 'Documentation',
        value: '15+ guides'
      }
    ],
    usedBy: [
      'Cloud-native deployment practices',
      'Container optimization techniques',
      'Kubernetes orchestration',
      'DevOps workflow automation'
    ]
  },
  {
    id: '3',
    slug: 'real-time-ai-tts-system',
    title: 'Real-time AI TTS System',
    shortDescription: 'High-performance text-to-speech and AI chat system built with Rust for sub-millisecond latency, featuring real-time WebSocket communication and hybrid cloud deployment.',
    fullDescription: `
      A high-performance text-to-speech and AI chat system with real-time audio streaming capabilities, 
      demonstrating expertise in systems programming and cloud deployment.
      
      Built with Rust (Axum) for consistent sub-millisecond latency and thread safety. Features a lightweight 
      frontend with Vanilla JavaScript (ES6+) and Web Audio API visualizations. Deployed using a hybrid strategy: 
      static frontend on Vercel (Global CDN) and containerized backend on Railway with Docker.
      
      Key achievements include implementing WebSocket protocols and Voice Activity Detection (VAD) to reduce 
      latency by 40% compared to standard REST polling, and solving cross-platform compatibility by setting up 
      cross-compilation workflow for AMD64 Docker images on ARM architecture.
    `,
    tags: [
      'Rust',
      'Axum',
      'Tokio',
      'WebSocket',
      'Docker',
      'Vanilla JavaScript',
      'Web Audio API',
      'Vercel',
      'Railway',
      'Voice Activity Detection',
      'Real-time Streaming',
      'AI/ML'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop', // Audio/Sound wave theme
    repoUrl: 'https://github.com/aminlahbib/TTS-Project',
    demoUrl: 'https://tts-project-two.vercel.app', 
    featured: true,
    metrics: [
      {
        label: 'Latency',
        value: 'Sub-millisecond'
      },
      {
        label: 'Performance Improvement',
        value: '40%'
      },
      {
        label: 'Container Size',
        value: '~1.5GB'
      },
      {
        label: 'Deployment',
        value: 'Hybrid Cloud'
      },
      {
        label: 'Frontend Dependencies',
        value: 'Zero'
      }
    ],
    usedBy: [
      'Real-time audio streaming',
      'Low-latency voice AI',
      'Hybrid cloud deployment',
      'Systems programming with Rust'
    ]
  },
  {
    id: '4',
    slug: 'supreme-bus',
    title: 'Supreme Bus',
    shortDescription: 'Enterprise-grade bus ticket booking platform built with microservices architecture, featuring 4 independent Spring Boot services and database-per-service pattern.',
    fullDescription: `
      A production-ready, full-stack microservices application for bus ticket booking, demonstrating 
      enterprise-level software engineering practices and distributed systems expertise.
      
      Built with 4 independent Spring Boot microservices (Customer Management, Ticket Shop, Fleet Management, 
      Ticket Dispatch), each with its own MySQL database following the database-per-service pattern. Features 
      JWT-based authentication, real-time seat reservation with a 15-minute hold mechanism to prevent 
      double-bookings through optimistic locking, and comprehensive error handling.
      
      The system includes a responsive frontend built with vanilla JavaScript (ES6 modules) featuring 
      interactive seat selection, booking management, and multi-language support. Entire application stack 
      is containerized using Docker Compose, orchestrating 8 containers with health checks and automated 
      deployment. Includes GitLab CI/CD pipeline for automated testing and deployment.
    `,
    tags: [
      'Java 21',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'MySQL',
      'Microservices',
      'Docker',
      'Docker Compose',
      'JWT',
      'REST APIs',
      'Vanilla JavaScript',
      'GitLab CI/CD',
      'OpenAPI',
      'Swagger',
      'Maven'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop', // Bus/Transportation theme
    repoUrl: 'https://github.com/aminlahbib/Supreme-bus', // Update if different
    demoUrl: '',
    featured: true,
    metrics: [
      {
        label: 'Microservices',
        value: '4'
      },
      {
        label: 'Databases',
        value: '4 MySQL'
      },
      {
        label: 'API Endpoints',
        value: '12+'
      },
      {
        label: 'Containers',
        value: '8'
      },
      {
        label: 'Booking Accuracy',
        value: '100%'
      },
      {
        label: 'Deployment',
        value: 'Single Command'
      }
    ],
    usedBy: [
      'Microservices architecture patterns',
      'Distributed transaction handling',
      'Database-per-service design',
      'Docker Compose orchestration'
    ]
  }
];

/**
 * Get all projects
 */
export const getAllProjects = (): Project[] => {
  return projects;
};

/**
 * Get featured projects only
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

/**
 * Get project by slug
 */
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};

/**
 * Get projects by tag
 */
export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter(project => 
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
