import { Project, ContactFormData, ApiResponse } from '../types';
import { getGitHubProjects } from './github';

const SIMULATED_LATENCY_MS = 600;

// Simulate backend latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for GitHub projects to avoid multiple API calls
let cachedProjects: Project[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const projectService = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    await delay(SIMULATED_LATENCY_MS);
    
    try {
      // Check cache first
      const now = Date.now();
      if (cachedProjects && (now - cacheTimestamp) < CACHE_DURATION) {
        return { success: true, data: cachedProjects };
      }
      
      // Fetch GitHub projects
      const githubProjects = await getGitHubProjects();
      
      // Sort by featured first, then by updated date (if available)
      githubProjects.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      
      // Cache the results
      cachedProjects = githubProjects;
      cacheTimestamp = now;
      
      return { success: true, data: githubProjects };
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Return empty array if GitHub fetch fails
      return { success: true, data: [] };
    }
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Project>> => {
    await delay(SIMULATED_LATENCY_MS);
    
    try {
      // Get all projects (will use cache if available)
      const response = await projectService.getAll();
      if (response.success && response.data) {
        const project = response.data.find(p => p.slug === slug);
        if (!project) {
          return { success: false, error: 'Project not found' };
        }
        return { success: true, data: project };
      }
      
      return { success: false, error: 'Project not found' };
    } catch (error) {
      console.error('Error fetching project:', error);
      return { success: false, error: 'Project not found' };
    }
  }
};

export const contactService = {
  submit: async (formData: ContactFormData): Promise<ApiResponse<null>> => {
    await delay(1000); // Slightly longer delay for "processing"

    // Simulate Rate Limiting (Mocking backend middleware)
    const lastSubmission = localStorage.getItem('last_contact_submission');
    const now = Date.now();
    
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
      // Limit: 1 request per minute for this mock
      return { success: false, error: 'Rate limit exceeded. Please try again in a minute.' };
    }

    // Simulate Zod Validation
    if (!formData.name || formData.name.length < 2) {
      return { success: false, error: 'Name must be at least 2 characters.' };
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return { success: false, error: 'Invalid email address.' };
    }
    if (!formData.message || formData.message.length < 10) {
      return { success: false, error: 'Message must be at least 10 characters.' };
    }

    // "Persist" success
    localStorage.setItem('last_contact_submission', now.toString());
    console.log('Form submitted to mock backend:', formData);
    
    return { success: true };
  }
};