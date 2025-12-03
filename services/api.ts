import { Project, ContactFormData, ApiResponse } from '../types';
import { MOCK_PROJECTS } from './mockData';

const SIMULATED_LATENCY_MS = 600;

// Simulate backend latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const projectService = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    await delay(SIMULATED_LATENCY_MS);
    return { success: true, data: MOCK_PROJECTS };
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Project>> => {
    await delay(SIMULATED_LATENCY_MS);
    const project = MOCK_PROJECTS.find(p => p.slug === slug);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
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