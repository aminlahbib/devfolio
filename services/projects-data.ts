import { Project } from '../types';

/**
 * Portfolio Projects Data
 * Based on comprehensive project documentation
 */

export const projects: Project[] = [
  {
    id: '1',
    slug: 'cloud-secrets-manager',
    title: 'Cloud Secrets Manager',
    shortDescription: 'Enterprise-grade secrets management platform with 3-tier microservices architecture, complete observability stack, and security-first design.',
    fullDescription: `Architected and developed an enterprise-grade secrets management platform demonstrating end-to-end ownership from design to deployment.

The platform features a 3-tier microservices architecture with specialized services: Secret Service for core credential management, Audit Service for compliance logging, and Notification Service for real-time alerts. All services communicate via event-driven architecture using Google Pub/Sub.

Security is implemented at every layer: AES-256-GCM encryption for secrets at rest, TOTP-based two-factor authentication with recovery codes, JWT authentication with refresh tokens, role-based access control with 5 permission levels, and Workload Identity for zero service account keys.

The frontend is a modern React 18/TypeScript SPA with TanStack Query for state management, featuring real-time notifications, responsive UI with Tailwind CSS, and role-based views.

Production-grade observability includes Prometheus for metrics (9 alert rules, 7 recording rules), Grafana for dashboards, and Loki with Promtail for centralized logging with 30-day retention.

Infrastructure is fully codified using Terraform for GCP resources (GKE, Cloud SQL, Pub/Sub, Secret Manager) and Helm charts for Kubernetes deployments, with Docker Compose for local development parity.`,
    tags: [
      'Java 21',
      'Spring Boot 3.3',
      'React 18',
      'TypeScript',
      'PostgreSQL 16',
      'Redis',
      'Kubernetes',
      'Terraform',
      'GCP',
      'Pub/Sub',
      'Prometheus',
      'Grafana',
      'Loki',
      'Docker',
      'Helm'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=800&fit=crop'
    ],
    repoUrl: 'https://github.com/aminlahbib/Cloud-Secrets-Manager',
    demoUrl: '',
    featured: true,
    metrics: [
      { label: 'Production Score', value: '7.2/10' },
      { label: 'Test Coverage', value: '80%+' },
      { label: 'Documentation', value: '17K lines' },
      { label: 'Services', value: '3' },
      { label: 'Cost Saved', value: '31%' },
      { label: 'Security Score', value: '8.0/10' }
    ],
    usedBy: [
      'AES-256-GCM encryption with key rotation',
      'TOTP-based 2FA with recovery codes',
      'Event-driven microservices via Pub/Sub',
      'Complete IaC with Terraform and Helm',
      'Production observability stack'
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: `An enterprise-grade secrets management platform demonstrating end-to-end ownership from design to deployment.

The platform enables teams to securely store, manage, and rotate sensitive credentials like API keys, database passwords, and certificates. Built with security-first principles and production-ready practices.

Key capabilities include hierarchical project organization, fine-grained access control, comprehensive audit logging, and real-time notifications for security events.`
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: `The platform uses a 3-tier microservices architecture:

**Secret Service (Core)**: Handles all CRUD operations for secrets, implements encryption/decryption, manages access control, and coordinates with other services.

**Audit Service**: Captures all system events for compliance, stores immutable audit logs, generates reports, and supports forensic analysis.

**Notification Service**: Delivers real-time alerts via WebSocket, sends email notifications, manages notification preferences, and handles event filtering.

All services communicate asynchronously via Google Pub/Sub for loose coupling and scalability.`
      },
      {
        id: 'security',
        label: 'Security',
        content: `Security is implemented at every layer:

**Encryption**: AES-256-GCM for secrets at rest, TLS 1.3 for transit, envelope encryption with Cloud KMS.

**Authentication**: JWT with short-lived access tokens, refresh token rotation, TOTP-based 2FA with recovery codes.

**Authorization**: RBAC with 5 permission levels (Viewer, Editor, Admin, Owner, Super Admin), resource-level permissions.

**Infrastructure**: Workload Identity (zero service account keys), private GKE cluster, Cloud Armor WAF, VPC Service Controls.`
      },
      {
        id: 'infrastructure',
        label: 'Infrastructure',
        content: `Fully codified infrastructure using modern IaC practices:

**Terraform**: GKE cluster, Cloud SQL (PostgreSQL), Pub/Sub topics, Secret Manager, IAM, networking.

**Helm Charts**: Kubernetes deployments, services, ingress, ConfigMaps, Secrets, HPA, PDB.

**Observability**: Prometheus (9 alert rules, 7 recording rules), Grafana dashboards, Loki for logs, Promtail for collection.

**Cost Optimization**: Achieved 31% reduction through right-sizing, committed use discounts, and efficient resource allocation.`
      }
    ]
  },
  {
    id: '2',
    slug: 'supreme-bus',
    title: 'Supreme Bus',
    shortDescription: 'Distributed bus booking platform with 4 independent microservices, database-per-service pattern, and distributed transaction handling.',
    fullDescription: `A production-ready microservices application for bus ticket booking, demonstrating enterprise-level distributed systems expertise.

The system consists of 4 independent Spring Boot microservices, each with its own MySQL database following strict database-per-service pattern:

• Customer Management (Port 8081): User authentication, profile management, JWT token issuance with BCrypt password hashing
• Ticket Shop (Port 8082): Booking creation, payment processing, reservation lifecycle management  
• Fleet Management (Port 8084): Bus schedules, route management, real-time seat availability tracking
• Ticket Dispatch (Port 8083): Digital ticket generation and delivery after successful bookings

The critical challenge of preventing double-bookings in a distributed system is solved through a 15-minute seat hold mechanism with optimistic locking. When a user selects a seat, it's temporarily reserved while they complete checkout. If payment fails or times out, the hold expires automatically, releasing the seat back to inventory.

The frontend is built with vanilla JavaScript ES6 modules featuring interactive seat selection with real-time availability updates, multi-language support (i18n), and dark/light theme switching.

The entire stack is containerized with Docker Compose, orchestrating 8 containers (4 services + 4 databases) with health checks, proper networking, and single-command deployment. GitLab CI/CD pipeline handles automated testing and deployment.`,
    tags: [
      'Java 21',
      'Spring Boot 3.5',
      'Spring Security',
      'Spring Data JPA',
      'MySQL 8',
      'Microservices',
      'Docker Compose',
      'JWT',
      'BCrypt',
      'GitLab CI/CD',
      'OpenAPI',
      'JavaScript ES6'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=1200&h=800&fit=crop'
    ],
    repoUrl: 'https://github.com/aminlahbib/Supreme-bus',
    demoUrl: '',
    featured: true,
    metrics: [
      { label: 'Microservices', value: '4' },
      { label: 'Databases', value: '4' },
      { label: 'Containers', value: '8' },
      { label: 'API Endpoints', value: '12+' },
      { label: 'Booking Accuracy', value: '100%' },
      { label: 'Lines of Code', value: '5K+' }
    ],
    usedBy: [
      'Distributed seat reservation with optimistic locking',
      '15-minute hold mechanism prevents double-bookings',
      'Database-per-service for true microservices independence',
      'JWT token propagation across services',
      'Single-command Docker Compose deployment'
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: `A production-ready microservices application for bus ticket booking, demonstrating enterprise-level distributed systems expertise.

The platform allows users to search for bus routes, view real-time seat availability, select seats with visual feedback, and complete bookings with secure payment processing.

Key features include multi-language support, dark/light theme switching, and responsive design for mobile devices.`
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: `The system uses a database-per-service microservices pattern:

**Customer Management (8081)**: User authentication, profile management, JWT token issuance with BCrypt password hashing.

**Ticket Shop (8082)**: Booking creation, payment processing, reservation lifecycle management with 15-minute seat holds.

**Fleet Management (8084)**: Bus schedules, route management, real-time seat availability tracking with optimistic locking.

**Ticket Dispatch (8083)**: Digital ticket generation, email delivery, QR code generation for mobile tickets.

Services communicate via REST APIs with JWT token propagation for authentication.`
      },
      {
        id: 'challenges',
        label: 'Challenges',
        content: `The critical challenge was preventing double-bookings in a distributed system.

**Problem**: Multiple users selecting the same seat simultaneously could lead to overbooking.

**Solution**: Implemented a 15-minute seat hold mechanism with optimistic locking:
1. When a user selects a seat, it's temporarily reserved
2. A timer starts for checkout completion
3. If payment fails or times out, the hold expires automatically
4. Optimistic locking prevents race conditions during final booking

**Result**: 100% booking accuracy with zero double-bookings in production.`
      },
      {
        id: 'devops',
        label: 'DevOps',
        content: `The entire stack is containerized with Docker Compose:

**Containers**: 8 total (4 services + 4 MySQL databases)

**Networking**: Custom bridge network, service discovery via container names

**Health Checks**: Each service has liveness and readiness probes

**CI/CD**: GitLab pipeline with automated testing, building, and deployment

**Deployment**: Single command (docker-compose up) brings up the entire stack

**Monitoring**: Health endpoints, structured logging, centralized error handling`
      }
    ]
  },
  {
    id: '3',
    slug: 'real-time-ai-tts-system',
    title: 'Real-time AI TTS System',
    shortDescription: 'High-performance text-to-speech system built with Rust achieving sub-millisecond latency, featuring WebSocket streaming and hybrid cloud deployment.',
    fullDescription: `A high-performance text-to-speech and AI chat system demonstrating expertise in systems programming, real-time streaming, and cloud deployment.

The backend is built with Rust using the Axum framework on top of Tokio async runtime. Rust was chosen for consistent sub-millisecond latency, memory safety without garbage collection pauses, and excellent concurrency for handling multiple simultaneous audio streams.

The system implements WebSocket protocols for bidirectional real-time communication, combined with client-side Voice Activity Detection (VAD). This architecture reduces latency by 40% compared to standard REST polling by eliminating request/response overhead and enabling true streaming.

Deployment uses a hybrid cloud strategy optimized for both edge performance and compute requirements:
• Frontend deployed on Vercel's Global CDN for <50ms load times worldwide
• Backend containerized and deployed on Railway, handling ~1.5GB of embedded AI models
• Dynamic backend URL injection at build time for environment flexibility

A significant challenge was cross-platform deployment: developing on an M-series Mac (ARM) but deploying to AMD64 servers. This was solved by setting up a cross-compilation workflow for Docker images, ensuring consistent builds across architectures.

The frontend is intentionally built with vanilla JavaScript (ES6+) and Web Audio API for audio visualizations, demonstrating that complex real-time applications don't require heavy frameworks.`,
    tags: [
      'Rust',
      'Axum',
      'Tokio',
      'WebSocket',
      'Docker',
      'JavaScript ES6',
      'Web Audio API',
      'Vercel',
      'Railway',
      'VAD',
      'Real-time Streaming',
      'Cross-compilation'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=800&fit=crop'
    ],
    repoUrl: 'https://github.com/aminlahbib/TTS-Project',
    demoUrl: 'https://tts-project-two.vercel.app',
    featured: true,
    metrics: [
      { label: 'Latency', value: 'Sub-ms' },
      { label: 'Improvement', value: '40%' },
      { label: 'Model Size', value: '1.5GB' },
      { label: 'Frontend Deps', value: '0' },
      { label: 'Global CDN', value: 'Yes' }
    ],
    usedBy: [
      'Sub-millisecond latency with Rust/Tokio',
      'WebSocket + VAD for 40% latency reduction',
      'Hybrid cloud: Vercel CDN + Railway compute',
      'Cross-compilation for ARM to AMD64 deployment',
      'Zero-dependency vanilla JS frontend'
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: `A high-performance text-to-speech and AI chat system with real-time audio streaming capabilities.

The system converts text to natural-sounding speech in real-time, enabling voice-based AI interactions. Users can have conversations with AI assistants through voice, with responses streamed as audio.

Built for low latency and high reliability, the system handles multiple concurrent users while maintaining consistent performance.`
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: `The system uses a hybrid cloud architecture:

**Backend (Rust/Axum)**: Handles TTS generation, LLM inference, WebSocket connections. Built on Tokio async runtime for high concurrency.

**Frontend (Vanilla JS)**: Zero-dependency implementation using Web Audio API for audio playback and visualization.

**Deployment Strategy**:
- Frontend on Vercel's Global CDN for <50ms load times
- Backend on Railway with ~1.5GB embedded AI models
- Dynamic URL injection for environment flexibility`
      },
      {
        id: 'performance',
        label: 'Performance',
        content: `Performance optimizations achieved 40% latency reduction:

**WebSocket Streaming**: Replaced REST polling with bidirectional WebSocket communication, eliminating request/response overhead.

**Voice Activity Detection**: Client-side VAD detects when users stop speaking, enabling immediate response without waiting for silence timeout.

**Rust Benefits**: Zero garbage collection pauses, predictable performance, excellent async handling with Tokio.

**Result**: Consistent sub-millisecond server latency, enabling natural conversational flow.`
      },
      {
        id: 'challenges',
        label: 'Challenges',
        content: `Key technical challenges solved:

**Cross-Platform Deployment**: Developing on M-series Mac (ARM) but deploying to AMD64 servers. Solved with cross-compilation workflow for Docker images.

**Model Embedding**: ~1.5GB of AI models needed to be containerized efficiently. Used multi-stage builds and layer caching.

**Audio Streaming**: Real-time audio requires careful buffer management. Implemented streaming with proper chunking and client-side buffering.

**Environment Flexibility**: Dynamic backend URL injection at build time allows deploying to different environments without code changes.`
      }
    ]
  },
  {
    id: '4',
    slug: 'equipment-management-system',
    title: 'Equipment Management System',
    shortDescription: 'Cloud-native equipment loan management with Spring Boot, featuring 60% Docker optimization and production-ready Kubernetes deployment.',
    fullDescription: `A cloud-native equipment loan management system demonstrating the complete journey from application development to production Kubernetes deployment.

The backend is a RESTful API built with Spring Boot serving 10+ endpoints for equipment inventory, user management, and loan tracking. Security is implemented with JWT authentication, BCrypt password hashing, and comprehensive CORS configuration.

The application showcases container optimization techniques. Through multi-stage Docker builds, careful dependency management, and proper base image selection, the final image size was reduced by 60% (from 500MB to 200MB), significantly improving deployment times and resource usage.

Kubernetes deployment includes:
• Deployments with 3 replicas for high availability
• Services for internal networking and load balancing
• ConfigMaps and Secrets for configuration management
• Persistent Volume Claims for MySQL data durability
• Liveness and readiness probes for zero-downtime deployments
• Resource limits and requests for cluster efficiency
• Horizontal Pod Autoscaler configuration

Container security best practices include non-root user execution, read-only root filesystem where possible, image vulnerability scanning, and proper secret management.

Comprehensive documentation covers the entire deployment workflow: local development with Docker Compose, deployment to Minikube for testing, and guides for production deployment to AWS EKS or GCP GKE.`,
    tags: [
      'Java 17',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'MySQL',
      'Docker',
      'Kubernetes',
      'NGINX',
      'JWT',
      'Maven',
      'ConfigMaps',
      'PVC'
    ],
    category: 'Full Stack',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop'
    ],
    repoUrl: 'https://github.com/aminlahbib/Equipment-Managment-System',
    demoUrl: '',
    featured: true,
    metrics: [
      { label: 'Image Size', value: '-60%' },
      { label: 'Endpoints', value: '10+' },
      { label: 'K8s Replicas', value: '3' },
      { label: 'Tables', value: '4' },
      { label: 'Guides', value: '15+' }
    ],
    usedBy: [
      'Multi-stage Docker builds for 60% size reduction',
      'Kubernetes with HPA and health probes',
      'JWT authentication with BCrypt',
      'Production-ready for EKS/GKE deployment',
      'Comprehensive deployment documentation'
    ],
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: `A cloud-native equipment loan management system for tracking equipment inventory, managing user access, and recording loan history.

The platform enables organizations to manage their equipment assets efficiently, with features for checking equipment in/out, tracking loan history, and managing user permissions.

Built with DevOps best practices, the system is designed for production Kubernetes deployment with high availability and scalability.`
      },
      {
        id: 'architecture',
        label: 'Architecture',
        content: `The system follows a cloud-native architecture:

**Backend**: Spring Boot REST API with 10+ endpoints for equipment, users, and loans.

**Database**: MySQL with 4 normalized tables, managed via Spring Data JPA.

**Authentication**: JWT-based with BCrypt password hashing, refresh tokens, and role-based access.

**Frontend**: Vanilla JavaScript with responsive design for desktop and mobile.

**Containerization**: Multi-stage Docker builds optimized for size and security.`
      },
      {
        id: 'kubernetes',
        label: 'Kubernetes',
        content: `Production-ready Kubernetes deployment configuration:

**Workloads**: Deployments with 3 replicas, rolling update strategy

**Networking**: ClusterIP services, Ingress with TLS termination

**Configuration**: ConfigMaps for app config, Secrets for credentials

**Storage**: PersistentVolumeClaims for MySQL data durability

**Scaling**: HorizontalPodAutoscaler based on CPU/memory

**Health**: Liveness and readiness probes for zero-downtime

**Security**: Non-root containers, resource limits, network policies`
      },
      {
        id: 'optimization',
        label: 'Optimization',
        content: `Container optimization techniques achieving 60% size reduction:

**Multi-stage Builds**: Separate build and runtime stages, only copying necessary artifacts.

**Base Image Selection**: Using distroless or Alpine-based images for minimal footprint.

**Dependency Management**: Careful analysis of dependencies, excluding test and development tools.

**Layer Optimization**: Ordering Dockerfile instructions for maximum cache utilization.

**Result**: Image reduced from 500MB to 200MB, faster pulls and deployments, reduced attack surface.`
      }
    ]
  }
];

export const getAllProjects = (): Project[] => projects;

export const getFeaturedProjects = (): Project[] => 
  projects.filter(project => project.featured);

export const getProjectBySlug = (slug: string): Project | undefined => 
  projects.find(project => project.slug === slug);

export const getProjectsByCategory = (category: Project['category']): Project[] => 
  projects.filter(project => project.category === category);

export const getProjectsByTag = (tag: string): Project[] => 
  projects.filter(project => 
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
