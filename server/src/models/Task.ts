import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  course: string
  category?: string
  stepNumber?: number
  icon?: string
  taskType?: 'lesson' | 'test' | 'practical'
  parentStep?: number
  orderInStep?: number
  deadline: Date
  status: 'pending' | 'in_progress' | 'in-progress' | 'submitted' | 'completed'
  difficulty: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'advanced'
  points: number
  content?: {
    question?: string
    options?: string[]
    correctAnswer?: number
    [key: string]: any
  }
  createdAt: Date
  updatedAt: Date
}

const TaskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  stepNumber: {
    type: Number,
    min: 1
  },
  icon: {
    type: String,
    trim: true
  },
  taskType: {
    type: String,
    enum: ['lesson', 'test', 'practical'],
    default: 'lesson'
  },
  parentStep: {
    type: Number,
    min: 1
  },
  orderInStep: {
    type: Number,
    min: 1
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'in-progress', 'submitted', 'completed'],
    default: 'pending'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'beginner', 'intermediate', 'advanced'],
    default: 'medium'
  },
  points: {
    type: Number,
    min: 0,
    default: 50
  },
  content: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
})

export default mongoose.model<ITask>('Task', TaskSchema)