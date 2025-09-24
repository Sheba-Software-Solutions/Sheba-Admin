import axios from 'axios';

// Get environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'auth_token';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear local storage and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(import.meta.env.VITE_USER_KEY || 'user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API helper functions
export const apiHelpers = {
  // Generic CRUD operations
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  patch: (url, data) => api.patch(url, data),
  delete: (url) => api.delete(url),

  // Authentication
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  changePassword: (data) => api.post('/auth/change-password/', data),

  // Dashboard
  getDashboardOverview: () => api.get('/dashboard/overview/'),
  getDashboardMetrics: (params) => api.get('/dashboard/metrics/', { params }),
  getRecentActivities: () => api.get('/dashboard/activities/recent/'),
  getMetricsChart: (params) => api.get('/dashboard/metrics/chart/', { params }),

  // Clients
  getClients: (params) => api.get('/clients/', { params }),
  getClient: (id) => api.get(`/clients/${id}/`),
  createClient: (data) => api.post('/clients/', data),
  updateClient: (id, data) => api.put(`/clients/${id}/`, data),
  deleteClient: (id) => api.delete(`/clients/${id}/`),
  getClientStats: () => api.get('/clients/stats/'),

  // Projects
  getProjects: (params) => api.get('/projects/', { params }),
  getProject: (id) => api.get(`/projects/${id}/`),
  createProject: (data) => api.post('/projects/', data),
  updateProject: (id, data) => api.put(`/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/projects/${id}/`),
  getProjectStats: () => api.get('/projects/statistics/'),

  // Content
  // Website Content
  getWebsiteContent: (params) => api.get('/content/website/', { params }),
  getWebsiteContentItem: (id) => api.get(`/content/website/${id}/`),
  createWebsiteContent: (data) => api.post('/content/website/', data),
  updateWebsiteContent: (id, data) => api.put(`/content/website/${id}/`, data),
  deleteWebsiteContent: (id) => api.delete(`/content/website/${id}/`),

  getBlogPosts: (params) => api.get('/content/blog/', { params }),
  getBlogPost: (id) => api.get(`/content/blog/${id}/`),
  createBlogPost: (data) => api.post('/content/blog/', data),
  updateBlogPost: (id, data) => api.put(`/content/blog/${id}/`, data),
  deleteBlogPost: (id) => api.delete(`/content/blog/${id}/`),

  getPortfolioProjects: (params) => api.get('/content/portfolio/', { params }),
  createPortfolioProject: (data) => api.post('/content/portfolio/', data),
  updatePortfolioProject: (id, data) => api.put(`/content/portfolio/${id}/`, data),
  deletePortfolioProject: (id) => api.delete(`/content/portfolio/${id}/`),

  getServices: (params) => api.get('/content/services/', { params }),
  createService: (data) => api.post('/content/services/', data),
  updateService: (id, data) => api.put(`/content/services/${id}/`, data),
  deleteService: (id) => api.delete(`/content/services/${id}/`),

  getTeamMembers: (params) => api.get('/content/team/', { params }),
  createTeamMember: (data) => api.post('/content/team/', data),
  updateTeamMember: (id, data) => api.put(`/content/team/${id}/`, data),
  deleteTeamMember: (id) => api.delete(`/content/team/${id}/`),

  // Content Stats
  getContentStats: () => api.get('/content/stats/'),

  // Communication
  getContactSubmissions: (params) => api.get('/communication/contacts/', { params }),
  getContactSubmission: (id) => api.get(`/communication/contacts/${id}/`),
  updateContactSubmission: (id, data) => api.put(`/communication/contacts/${id}/`, data),
  deleteContactSubmission: (id) => api.delete(`/communication/contacts/${id}/`),

  getEmailTemplates: (params) => api.get('/communication/email-templates/', { params }),
  createEmailTemplate: (data) => api.post('/communication/email-templates/', data),
  updateEmailTemplate: (id, data) => api.put(`/communication/email-templates/${id}/`, data),
  deleteEmailTemplate: (id) => api.delete(`/communication/email-templates/${id}/`),

  getNewsletters: (params) => api.get('/communication/newsletters/', { params }),
  createNewsletter: (data) => api.post('/communication/newsletters/', data),
  updateNewsletter: (id, data) => api.put(`/communication/newsletters/${id}/`, data),
  deleteNewsletter: (id) => api.delete(`/communication/newsletters/${id}/`),

  getSubscribers: (params) => api.get('/communication/subscribers/', { params }),
  createSubscriber: (data) => api.post('/communication/subscribers/', data),
  updateSubscriber: (id, data) => api.put(`/communication/subscribers/${id}/`, data),
  deleteSubscriber: (id) => api.delete(`/communication/subscribers/${id}/`),

  // Settings
  getCompanySettings: () => api.get('/settings/company/'),
  updateCompanySettings: (data) => api.put('/settings/company/', data),

  getSystemSettings: () => api.get('/settings/system/'),
  updateSystemSettings: (data) => api.put('/settings/system/', data),

  getSystemLogs: (params) => api.get('/settings/logs/', { params }),
};

export default api;
