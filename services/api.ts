import { Project, ContactFormData, ApiResponse } from '../types';
import { getAllProjects, getProjectBySlug, getFeaturedProjects } from './projects-data';

const SIMULATED_LATENCY_MS = 300;

// Simulate backend latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    await delay(SIMULATED_LATENCY_MS);
    
    try {
      const projects = getAllProjects();
      return { success: true, data: projects };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error: 'Failed to fetch projects' };
    }
  },

  getFeatured: async (): Promise<ApiResponse<Project[]>> => {
    await delay(SIMULATED_LATENCY_MS);
    
    try {
      const projects = getFeaturedProjects();
      return { success: true, data: projects };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return { success: false, error: 'Failed to fetch featured projects' };
    }
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Project>> => {
    await delay(SIMULATED_LATENCY_MS);
    
    try {
      const project = getProjectBySlug(slug);
      if (!project) {
        return { success: false, error: 'Project not found' };
      }
      return { success: true, data: project };
    } catch (error) {
      console.error('Error fetching project:', error);
      return { success: false, error: 'Project not found' };
    }
  }
};

// Contact email configuration
const CONTACT_EMAIL = 'amine.lhb00@gmail.com';

export const contactService = {
  /**
   * Opens the user's email client with pre-filled message.
   * This is the most reliable approach - works 100% of the time without third-party services.
   */
  submit: async (formData: ContactFormData): Promise<ApiResponse<null>> => {
    await delay(300);

    // Validate form data
    if (!formData.name || formData.name.length < 2) {
      return { success: false, error: 'Name must be at least 2 characters.' };
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return { success: false, error: 'Invalid email address.' };
    }
    if (!formData.message || formData.message.length < 10) {
      return { success: false, error: 'Message must be at least 10 characters.' };
    }

    // Build mailto URL
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoUrl;
    
    return { success: true };
  },

  /**
   * Get the direct email address for display
   */
  getEmail: () => CONTACT_EMAIL
};
