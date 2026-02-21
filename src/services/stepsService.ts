import api from './api'

export interface Test {
  question: string
  options: string[]
  correctAnswer: number
}

export interface CodeTask {
  instruction: string
  starterCode: string
  solution: string
  hints: string[]
}

export interface Step {
  stepNumber: number
  title: string
  category: string
  points: number
  testsCount?: number
  tests?: Test[]
  codeTask?: CodeTask
}

export interface StepsResponse {
  steps: Step[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface TestsResponse {
  tests: Test[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export const stepsService = {
  // Pagination bilan qadamlarni olish (testsiz)
  getSteps: async (page: number = 1, limit: number = 10): Promise<StepsResponse> => {
    const response = await api.get(`/steps?page=${page}&limit=${limit}`)
    return response.data
  },

  // Bitta qadamni olish (testlar bilan)
  getStep: async (stepNumber: number): Promise<Step> => {
    const response = await api.get(`/steps/${stepNumber}`)
    return response.data
  },

  // Qadam testlarini pagination bilan olish
  getStepTests: async (stepNumber: number, page: number = 1, limit: number = 1): Promise<TestsResponse> => {
    const response = await api.get(`/steps/${stepNumber}/tests?page=${page}&limit=${limit}`)
    return response.data
  },

  // O'quvchining yakunlagan qadamlarini olish
  getProgress: async (): Promise<{ progress: { stepNumber: number; status: string; score: number; completedAt: string }[] }> => {
    const response = await api.get('/steps/progress')
    return response.data
  },

  // Qadam kodini topshirish
  submitStep: async (stepNumber: number, content: string): Promise<any> => {
    const response = await api.post(`/steps/${stepNumber}/submit`, {
      submissionType: 'code',
      content
    })
    return response.data
  }
}
