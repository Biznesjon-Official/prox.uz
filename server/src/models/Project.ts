import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  technology: string
  technologies?: string[]
  students: number
  status: 'active' | 'completed' | 'planning'
  progress: number
  deadline: Date
  url?: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema = new Schema({
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
  technology: {
    type: String,
    required: true,
    trim: true
  },
  technologies: {
    type: [String],
    default: []
  },
  students: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'planning'],
    default: 'planning'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  url: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.model<IProject>('Project', ProjectSchema)