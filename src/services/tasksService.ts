import api from './api'

export interface Task {
  _id: string
  title: string
  description: string
  course: string
  category?: string
  stepNumber?: number
  icon?: string
  taskType?: 'lesson' | 'test' | 'practical'
  parentStep?: number
  orderInStep?: number
  deadline: string
  status: 'pending' | 'in_progress' | 'in-progress' | 'submitted' | 'completed'
  difficulty: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced'
  points: number
  content?: {
    question?: string
    options?: string[]
    correctAnswer?: number
    [key: string]: any
  }
  createdAt: string
}

export const tasksService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks')
    return response.data
  },

  getTasksStats: async () => {
    const response = await api.get('/tasks/stats')
    return response.data
  },

  updateTaskStatus: async (id: string, status: string) => {
    const response = await api.put(`/tasks/${id}/status`, { status })
    return response.data
  },

  submitTask: async (id: string, files: FormData) => {
    const response = await api.post(`/tasks/${id}/submit`, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}