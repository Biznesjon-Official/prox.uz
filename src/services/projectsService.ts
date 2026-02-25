import api from './api'

export interface Project {
  _id: string
  title: string
  description: string
  technology: string
  technologies?: string[]
  students: number
  status: 'active' | 'completed' | 'planning'
  progress: number
  deadline: string
  url?: string
  logo?: string
  createdAt: string
}

export const projectsService = {
  getAllProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects')
    return response.data
  },

  getProjectById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`)
    return response.data
  },

  getProjectsStats: async () => {
    const response = await api.get('/projects/stats')
    return response.data
  },

  createProject: async (projectData: Partial<Project>): Promise<Project> => {
    const response = await api.post('/projects', projectData)
    return response.data
  },

  updateProject: async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, projectData)
    return response.data
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`)
  }
}