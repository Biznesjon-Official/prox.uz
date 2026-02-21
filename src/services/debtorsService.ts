import api from './api'

export interface Debtor {
  _id: string
  fullName: string
  username: string
  email?: string
  phone?: string
  course: string
  enrollmentDate: string
  daysSinceEnrollment: number
  expectedProgress: number
  actualProgress: number
  debtPercentage: number
  isDebtor: boolean
  status: string
}

export const debtorsService = {
  getAllDebtors: async (): Promise<Debtor[]> => {
    const response = await api.get('/debtors')
    return response.data
  },

  getDebtorsStats: async () => {
    const response = await api.get('/debtors/stats')
    return response.data
  },

  updatePayment: async (id: string, amount: number) => {
    const response = await api.put(`/debtors/${id}/payment`, { amount })
    return response.data
  }
}