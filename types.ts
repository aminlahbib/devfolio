export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Full Stack';
  imageUrl: string;
  repoUrl?: string;
  demoUrl?: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
  usedBy?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export enum LoadStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}