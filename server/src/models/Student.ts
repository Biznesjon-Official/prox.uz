import mongoose, { Document, Schema } from 'mongoose'

// prox.uz_crm bilan bir xil schema
export interface IStudent extends Document {
  name: string
  phone: string
  role: string
  subscriptionPlan: string
  monthly_fee: number
  balance: number
  totalBall: number
  step: number
  joinDate: Date
  days: string[]
  todayBall: string
  workType: string
  branch_id: mongoose.Types.ObjectId
  study_days: string[]
  payment_date: Date
  username: string
  password: string
  warnings: Array<{
    reason: string
    date: Date
    given_by: string
  }>
  is_blocked: boolean
  blocked_at: Date
  // To'lov tizimi uchun yangi maydonlar
  current_month_payment?: 'paid' | 'unpaid'
  last_payment_date?: Date
  payment_deadline?: Date
  payment_warning_shown?: boolean
  created_at: Date
  updated_at: Date
  // Additional fields for debtors
  enrollmentDate?: Date
  progress?: number
  totalPayment?: number
  paidAmount?: number
  remainingAmount?: number
  fullName?: string
  course?: string
  status?: string
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, default: 'Student Offline' },
  subscriptionPlan: { type: String, default: 'Pro' },
  monthly_fee: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  totalBall: { type: Number, default: 0 },
  step: { type: Number, default: 0 },
  joinDate: { type: Date, required: true },
  days: [String],
  todayBall: String,
  workType: String,
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  study_days: [String],
  payment_date: Date,
  username: { type: String, sparse: true },
  password: String,
  warnings: [{
    reason: String,
    date: { type: Date, default: Date.now },
    given_by: String
  }],
  is_blocked: { type: Boolean, default: false },
  blocked_at: Date,
  // To'lov tizimi uchun yangi maydonlar
  current_month_payment: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  last_payment_date: Date,
  payment_deadline: Date,
  payment_warning_shown: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  // Additional fields
  enrollmentDate: Date,
  progress: { type: Number, default: 0 },
  totalPayment: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, default: 0 },
  fullName: String,
  course: String,
  status: { type: String, default: 'active' }
})

StudentSchema.pre('save', function(next) {
  this.updated_at = new Date()
  next()
})

export default mongoose.model<IStudent>('Student', StudentSchema)
