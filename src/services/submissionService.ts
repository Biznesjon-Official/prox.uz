import api from './api'

export interface Submission {
  _id: string
  taskId: string
  studentId: string
  submissionType: 'text' | 'code' | 'file' | 'test'
  content: string
  files?: string[]
  testAnswers?: {
    questionId: string
    answer: string
    isCorrect?: boolean
  }[]
  aiReview?: {
    score: number
    feedback: string
    suggestions: string[]
    reviewedAt: string
  }
  status: 'submitted' | 'reviewing' | 'reviewed' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
}

export const submissionService = {
  // Vazifa topshirish
  submitTask: async (taskId: string, data: {
    submissionType: 'text' | 'code' | 'file' | 'test'
    content: string
    testAnswers?: any[]
  }) => {
    const response = await api.post(`/tasks/${taskId}/submit`, data)
    return response.data
  },

  // Submission natijasini olish
  getSubmissionResult: async (submissionId: string): Promise<Submission> => {
    const response = await api.get(`/submissions/${submissionId}`)
    return response.data
  },

  // O'quvchining barcha submission'larini olish
  getStudentSubmissions: async (taskId?: string): Promise<Submission[]> => {
    const params = taskId ? { taskId } : {}
    const response = await api.get('/submissions', { params })
    return response.data
  },

  // Vazifa statusini yangilash
  updateTaskStatus: async (taskId: string, status: string) => {
    const response = await api.put(`/tasks/${taskId}/status`, { status })
    return response.data
  },

  // Fayl yuklash
  uploadFiles: async (files: FileList): Promise<string[]> => {
    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('files', file)
    })

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data.files
  }
}