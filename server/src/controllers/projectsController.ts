import { Request, Response } from 'express'
import Project from '../models/Project.js'

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ _id: 1 })
    res.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ message: 'Loyiha topilmadi' })
    }

    res.json(project)
  } catch (error) {
    console.error('Get project by ID error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get projects statistics
export const getProjectsStats = async (req: Request, res: Response) => {
  try {
    const total = await Project.countDocuments()
    const completed = await Project.countDocuments({ status: 'completed' })
    const active = await Project.countDocuments({ status: 'active' })
    const planning = await Project.countDocuments({ status: 'planning' })

    // Calculate total participants
    const projects = await Project.find()
    const totalParticipants = projects.reduce((sum, project) => sum + project.students, 0)

    res.json({
      total,
      completed,
      active,
      planning,
      totalParticipants
    })
  } catch (error) {
    console.error('Get projects stats error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({ message: 'Loyiha topilmadi' })
    }

    res.json(project)
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Loyiha topilmadi' })
    }

    res.json({ message: 'Loyiha o\'chirildi' })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}