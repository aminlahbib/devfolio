import { Project } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'cloud-native-ecommerce',
    title: 'CloudNative E-commerce Platform',
    category: 'Full Stack',
    shortDescription: 'Microservices-based e-commerce engine built with Elysia, Bun, and gRPC.',
    fullDescription: 'A high-performance e-commerce backend capable of handling 10k+ requests per second. Built using a microservices architecture with Bun and ElysiaJS for extreme speed. Services communicate via gRPC, and the entire cluster is orchestrated using Kubernetes. The frontend is a highly optimized Next.js application served via a custom CDN setup.',
    tags: ['Bun', 'Elysia', 'Docker', 'Kubernetes', 'gRPC', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    repoUrl: '#',
    featured: true,
    metrics: [
      { label: 'RPS', value: '10,000+' },
      { label: 'Latency', value: '<50ms' }
    ],
    usedBy: ['TechCorp Inc.', 'Shopify Clone', 'Internal R&D']
  },
  {
    id: '2',
    slug: 'edge-analytics-dashboard',
    title: 'Edge Analytics Dashboard',
    category: 'Frontend',
    shortDescription: 'Real-time data visualization using D3.js and WebSockets.',
    fullDescription: 'An interactive analytics dashboard designed for monitoring edge devices in real-time. It leverages D3.js for complex data visualization and WebSockets for live data streaming. The state management is handled by Zustand to ensure minimal re-renders in a high-frequency update environment.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSockets', 'Vite'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    repoUrl: '#',
    demoUrl: '#',
    featured: true,
    metrics: [
      { label: 'Updates', value: '60fps' },
      { label: 'Bundle Size', value: '45kb' }
    ],
    usedBy: ['DataVisio', 'IoT Monitor']
  },
  {
    id: '3',
    slug: 'infra-ci-cd-pipeline',
    title: 'GitOps CI/CD Pipeline',
    category: 'DevOps',
    shortDescription: 'Automated deployment pipeline using GitHub Actions and ArgoCD.',
    fullDescription: 'A robust CI/CD solution that implements GitOps principles. It automatically builds Docker images, runs comprehensive integration tests, and deploys to staging/production environments using ArgoCD. Includes automated rollback capabilities and vulnerability scanning via Trivy.',
    tags: ['GitHub Actions', 'ArgoCD', 'Terraform', 'Docker', 'AWS'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    featured: false,
    usedBy: ['DevOps Team A', 'Legacy Migration Project']
  },
  {
    id: '4',
    slug: 'elysia-auth-service',
    title: 'Elysia Auth Service',
    category: 'Backend',
    shortDescription: 'JWT-based authentication microservice with rate limiting.',
    fullDescription: 'A standalone authentication service providing OAuth2 and JWT flows. Optimized for Bun runtime, it features Redis-backed rate limiting and session management, ensuring secure and fast identity verification for distributed systems.',
    tags: ['Bun', 'Elysia', 'Redis', 'JWT', 'OAuth2'],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    repoUrl: '#',
    featured: false,
    usedBy: ['Auth0 Alternative', 'SecureApp']
  }
];