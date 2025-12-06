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

// Web3Forms configuration
const WEB3FORMS_ACCESS_KEY = '411d4725-d2df-49c4-bbea-3b919225605f';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const CONTACT_EMAIL = 'amine.lhb00@gmail.com';

export const contactService = {
  /**
   * Submit contact form via Web3Forms API
   */
  submit: async (formData: ContactFormData): Promise<ApiResponse<null>> => {
    // Validate form data locally first
    if (!formData.name || formData.name.length < 2) {
      return { success: false, error: 'Name must be at least 2 characters.' };
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return { success: false, error: 'Invalid email address.' };
    }
    if (!formData.message || formData.message.length < 10) {
      return { success: false, error: 'Message must be at least 10 characters.' };
    }

    // Check if access key is configured
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      console.warn('Web3Forms access key not configured. Using mailto fallback.');
      return contactService.submitViaMailto(formData);
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
        })
      });

      const result = await response.json();

      if (result.success) {
        return { success: true };
      } else {
        console.error('Web3Forms error:', result);
        return { success: false, error: result.message || 'Failed to send message.' };
      }
    } catch (error) {
      console.error('Contact form error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  /**
   * Fallback: Opens email client with pre-filled message
   */
  submitViaMailto: async (formData: ContactFormData): Promise<ApiResponse<null>> => {
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return { success: true };
  },

  /**
   * Get the direct email address for display
   */
  getEmail: () => CONTACT_EMAIL
};
