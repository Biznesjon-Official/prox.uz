import mongoose, { Document, Schema } from 'mongoose'

export interface IStepProgress extends Document {
  studentId: mongoose.Types.ObjectId
  stepNumber: number
  status: 'completed' | 'in_progress'
  score: number
  content?: string
  completedAt: Date
  createdAt: Date
  updatedAt: Date
}

const StepProgressSchema: Schema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  stepNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'in_progress'],
    default: 'completed'
  },
  score: {
    type: Number,
    default: 0
  },
  content: {
    type: String
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Unique index
StepProgressSchema.index({ studentId: 1, stepNumber: 1 }, { unique: true })

export default mongoose.model<IStepProgress>('StepProgress', StepProgressSchema)