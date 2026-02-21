import { Request, Response } from 'express'
import Task from '../models/Task.js'

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    console.error('Get tasks error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get tasks statistics
export const getTasksStats = async (req: Request, res: Response) => {
  try {
    const total = await Task.countDocuments()
    const completed = await Task.countDocuments({ status: 'completed' })
    const pending = await Task.countDocuments({ status: 'pending' })
    const inProgress = await Task.countDocuments({ 
      $or: [{ status: 'in_progress' }, { status: 'in-progress' }] 
    })
    const submitted = await Task.countDocuments({ status: 'submitted' })

    // Calculate total points
    const tasks = await Task.find()
    const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0)

    res.json({
      total,
      completed,
      pending,
      inProgress,
      submitted,
      totalPoints
    })
  } catch (error) {
    console.error('Get tasks stats error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Update task status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Vazifa topilmadi' })
    }

    res.json(task)
  } catch (error) {
    console.error('Update task status error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}