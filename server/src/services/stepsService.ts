import fs from 'fs'
import path from 'path'

interface Test {
  question: string
  options: string[]
  correctAnswer: number
}

interface Step {
  stepNumber: number
  title: string
  category: string
  points: number
  tests: Test[]
}

interface StepsData {
  steps: Step[]
}

let stepsCache: StepsData | null = null

export const stepsService = {
  loadSteps(): StepsData {
    if (stepsCache) return stepsCache
    
    const filePath = path.join(__dirname, '../../public/data/steps.json')
    const altPath = path.join(__dirname, '../../../public/data/steps.json')
    
    let data: string
    try {
      data = fs.readFileSync(filePath, 'utf-8')
    } catch {
      data = fs.readFileSync(altPath, 'utf-8')
    }
    
    stepsCache = JSON.parse(data)
    return stepsCache!
  },

  getAllSteps(): Step[] {
    return this.loadSteps().steps
  },

  getStepByNumber(stepNumber: number): Step | undefined {
    return this.getAllSteps().find(s => s.stepNumber === stepNumber)
  },

  getStepTests(stepNumber: number): Test[] {
    const step = this.getStepByNumber(stepNumber)
    return step?.tests || []
  },

  getStepsByCategory(category: string): Step[] {
    return this.getAllSteps().filter(s => s.category === category)
  },

  getCategories(): string[] {
    const allSteps = this.getAllSteps()
    const categories = new Set<string>()
    allSteps.forEach(s => categories.add(s.category))
    return Array.from(categories)
  }
}
