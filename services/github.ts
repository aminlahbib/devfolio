import { Project } from '../types';

const GITHUB_USERNAME = 'aminlahbib';
const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  default_branch: string;
}

/**
 * Fetches all public repositories for the configured GitHub user
 */
export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out archived, disabled, and private repos
    return repos.filter(repo => !repo.archived && !repo.disabled && !repo.private);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

/**
 * Fetches language breakdown for a repository
 */
const fetchRepoLanguages = async (repoFullName: string): Promise<string[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoFullName}/languages`);
    if (!response.ok) {
      return [];
    }
    const languages: Record<string, number> = await response.json();
    // Return languages sorted by bytes (most used first)
    return Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
  } catch (error) {
    console.error(`Error fetching languages for ${repoFullName}:`, error);
    return [];
  }
};

/**
 * Maps a GitHub repository language to a project category
 */
const mapLanguageToCategory = (language: string | null, topics: string[]): Project['category'] => {
  const allTags = [language, ...topics].filter(Boolean).map(t => t?.toLowerCase() || '');
  
  // Check for full stack indicators
  if (allTags.some(t => ['fullstack', 'full-stack', 'mern', 'mean', 'stack'].includes(t))) {
    return 'Full Stack';
  }
  
  // Check for frontend indicators
  if (allTags.some(t => ['react', 'vue', 'angular', 'svelte', 'frontend', 'ui', 'ux', 'css', 'html', 'tailwind', 'nextjs', 'vite'].includes(t))) {
    return 'Frontend';
  }
  
  // Check for backend indicators
  if (allTags.some(t => ['backend', 'api', 'server', 'express', 'fastify', 'elysia', 'bun', 'node', 'python', 'go', 'rust', 'java', 'spring'].includes(t))) {
    return 'Backend';
  }
  
  // Check for DevOps indicators
  if (allTags.some(t => ['devops', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'aws', 'azure', 'gcp', 'github-actions', 'gitlab', 'jenkins'].includes(t))) {
    return 'DevOps';
  }
  
  // Default based on language
  if (language) {
    const frontendLanguages = ['javascript', 'typescript', 'html', 'css', 'scss', 'sass'];
    const backendLanguages = ['python', 'java', 'go', 'rust', 'php', 'ruby', 'c#', 'c++', 'c'];
    
    if (frontendLanguages.includes(language.toLowerCase())) {
      return 'Frontend';
    }
    if (backendLanguages.includes(language.toLowerCase())) {
      return 'Backend';
    }
  }
  
  return 'Full Stack'; // Default fallback
};

/**
 * Normalizes and formats technology names for display
 */
const normalizeTechName = (name: string): string => {
  const normalized = name.toLowerCase().trim();
  
  // Mapping of common variations to standard names
  const techMap: Record<string, string> = {
    'reactjs': 'React',
    'react.js': 'React',
    'react-js': 'React',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'node-js': 'Node.js',
    'nextjs': 'Next.js',
    'next.js': 'Next.js',
    'next-js': 'Next.js',
    'vuejs': 'Vue.js',
    'vue.js': 'Vue.js',
    'vue-js': 'Vue.js',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'html5': 'HTML5',
    'css3': 'CSS3',
    'scss': 'SASS',
    'sass': 'SASS',
    'mongodb': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'mysql': 'MySQL',
    'redis': 'Redis',
    'graphql': 'GraphQL',
    'rest-api': 'REST API',
    'restapi': 'REST API',
    'github-actions': 'GitHub Actions',
    'githubactions': 'GitHub Actions',
    'ci-cd': 'CI/CD',
    'cicd': 'CI/CD',
    'aws': 'AWS',
    'azure': 'Azure',
    'gcp': 'Google Cloud',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'k8s': 'Kubernetes',
    'terraform': 'Terraform',
    'express': 'Express.js',
    'expressjs': 'Express.js',
    'fastify': 'Fastify',
    'elysia': 'ElysiaJS',
    'elysiajs': 'ElysiaJS',
    'bun': 'Bun',
    'prisma': 'Prisma',
    'tailwind': 'Tailwind CSS',
    'tailwindcss': 'Tailwind CSS',
    'tailwind-css': 'Tailwind CSS',
    'vite': 'Vite',
    'webpack': 'Webpack',
    'jest': 'Jest',
    'vitest': 'Vitest',
    'cypress': 'Cypress',
    'playwright': 'Playwright',
    'python': 'Python',
    'java': 'Java',
    'go': 'Go',
    'rust': 'Rust',
    'php': 'PHP',
    'ruby': 'Ruby',
    'csharp': 'C#',
    'c++': 'C++',
    'cpp': 'C++',
    'c': 'C',
    'swift': 'Swift',
    'kotlin': 'Kotlin',
    'dart': 'Dart',
    'flutter': 'Flutter',
    'react-native': 'React Native',
    'reactnative': 'React Native',
  };
  
  // Check if we have a direct mapping
  if (techMap[normalized]) {
    return techMap[normalized];
  }
  
  // Format: capitalize first letter of each word, handle hyphens and underscores
  return name
    .split(/[-_\s]+/)
    .map(word => {
      // Handle special cases
      if (word.toLowerCase() === 'api') return 'API';
      if (word.toLowerCase() === 'ui') return 'UI';
      if (word.toLowerCase() === 'ux') return 'UX';
      if (word.toLowerCase() === 'js') return 'JS';
      if (word.toLowerCase() === 'ts') return 'TS';
      if (word.toLowerCase() === 'css') return 'CSS';
      if (word.toLowerCase() === 'html') return 'HTML';
      if (word.toLowerCase() === 'sql') return 'SQL';
      if (word.toLowerCase() === 'nosql') return 'NoSQL';
      
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

/**
 * Extracts tags from repository topics, languages, and description
 */
const extractTags = async (repo: GitHubRepo, languages: string[]): Promise<string[]> => {
  const tags = new Set<string>();
  
  // Priority 1: Add GitHub topics (these are curated by the repo owner)
  repo.topics.forEach(topic => {
    // Skip generic/non-technical topics
    const skipTopics = ['portfolio', 'website', 'web', 'project', 'demo', 'example', 'tutorial', 'learning', 'practice'];
    if (!skipTopics.includes(topic.toLowerCase())) {
      const normalized = normalizeTechName(topic);
      tags.add(normalized);
    }
  });
  
  // Priority 2: Add languages from the languages API (more accurate than just primary language)
  languages.forEach(lang => {
    const normalized = normalizeTechName(lang);
    tags.add(normalized);
  });
  
  // Priority 3: Add primary language if not already included
  if (repo.language && !tags.has(normalizeTechName(repo.language))) {
    tags.add(normalizeTechName(repo.language));
  }
  
  // Priority 4: Extract tech from description (only if we don't have many tags yet)
  if (tags.size < 5 && repo.description) {
    const description = repo.description.toLowerCase();
    const commonTech = [
      'react', 'vue', 'angular', 'svelte', 'typescript', 'javascript', 
      'node', 'python', 'java', 'go', 'rust', 'php', 'ruby',
      'docker', 'kubernetes', 'terraform', 'aws', 'azure', 'gcp',
      'tailwind', 'vite', 'nextjs', 'express', 'mongodb', 'postgresql', 
      'redis', 'graphql', 'prisma', 'elysia', 'bun', 'fastify',
      'jest', 'cypress', 'playwright', 'webpack', 'rollup'
    ];
    
    commonTech.forEach(tech => {
      if (description.includes(tech.toLowerCase()) && tags.size < 10) {
        const normalized = normalizeTechName(tech);
        tags.add(normalized);
      }
    });
  }
  
  // Convert to array, remove duplicates, and limit to 10 tags
  return Array.from(tags).slice(0, 10);
};

/**
 * Generates a slug from repository name
 */
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Gets a placeholder image URL based on repository name
 */
const getImageUrl = (repo: GitHubRepo): string => {
  // Use a deterministic image based on repo name
  const hash = repo.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/800/600?random=${hash}`;
};

/**
 * Transforms a GitHub repository to a Project
 */
export const transformRepoToProject = async (repo: GitHubRepo): Promise<Project> => {
  const category = mapLanguageToCategory(repo.language, repo.topics);
  
  // Fetch languages breakdown for more accurate tags
  const languages = await fetchRepoLanguages(repo.full_name);
  const tags = await extractTags(repo, languages);
  
  // Determine if project should be featured (starred repos or repos with many stars)
  const featured = repo.stargazers_count > 0 || repo.topics.includes('portfolio') || repo.topics.includes('showcase');
  
  return {
    id: `github-${repo.id}`,
    slug: generateSlug(repo.name),
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    shortDescription: repo.description || 'A project from my GitHub portfolio.',
    fullDescription: repo.description 
      ? `${repo.description}\n\nThis repository contains the source code and documentation for this project. Check out the repository for more details, issues, and contributions.`
      : 'A project from my GitHub portfolio. Check out the repository for more details.',
    tags,
    category,
    imageUrl: getImageUrl(repo),
    repoUrl: repo.html_url,
    demoUrl: repo.homepage || undefined,
    featured,
    metrics: [
      { label: 'Stars', value: repo.stargazers_count.toString() },
      { label: 'Forks', value: repo.forks_count.toString() }
    ]
  };
};

/**
 * Fetches and transforms all public GitHub repositories to Projects
 */
export const getGitHubProjects = async (): Promise<Project[]> => {
  const repos = await fetchGitHubRepos();
  // Transform repos in parallel, but limit concurrency to avoid rate limiting
  const projects = await Promise.all(repos.map(repo => transformRepoToProject(repo)));
  return projects;
};

