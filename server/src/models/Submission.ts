import mongoose, { Document, Schema } from 'mongoose'

export interface ISubmission extends Document {
  taskId: mongoose.Types.ObjectId
  studentId: mongoose.Types.ObjectId
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
    errors?: Array<{
      line?: number
      message: string
      code?: string
    }>
    correctedCode?: string
    reviewedAt: Date
  }
  status: 'submitted' | 'reviewing' | 'reviewed' | 'approved' | 'rejected'
  submittedAt: Date
  reviewedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const SubmissionSchema: Schema = new Schema({
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  submissionType: {
    type: String,
    enum: ['text', 'code', 'file', 'test'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  files: [{
    type: String
  }],
  testAnswers: [{
    questionId: String,
    answer: String,
    isCorrect: Boolean
  }],
  aiReview: {
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    feedback: String,
    suggestions: [String],
    errors: [{
      line: Number,
      message: String,
      code: String
    }],
    correctedCode: String,
    reviewedAt: Date
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewing', 'reviewed', 'approved', 'rejected'],
    default: 'submitted'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: Date
}, {
  timestamps: true
})

export default mongoose.model<ISubmission>('Submission', SubmissionSchema)