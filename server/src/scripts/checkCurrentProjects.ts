import mongoose from 'mongoose'
import Project from '../models/Project'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function checkCurrentProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('MongoDB ga ulandi')

    // Get all projects
    const projects = await Project.find().sort({ title: 1 })
    console.log(`\n📋 Hozirgi loyihalar (${projects.length} ta):`)
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. "${project.title}" - ${project.url || 'URL yo\'q'} - ${project.createdAt}`)
    })

    // Group by similar titles to find potential duplicates
    console.log('\n🔍 O\'xshash nomli loyihalarni qidirish:')
    const titleGroups = new Map()
    
    projects.forEach(project => {
      const baseTitle = project.title.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/academy|jon|uz/g, '')
        .replace(/[^\w]/g, '')
      
      if (!titleGroups.has(baseTitle)) {
        titleGroups.set(baseTitle, [])
      }
      titleGroups.get(baseTitle).push(project)
    })

    titleGroups.forEach((projectList: any[], baseTitle) => {
      if (projectList.length > 1) {
        console.log(`\n"${baseTitle}" asosida ${projectList.length} ta loyiha:`)
        projectList.forEach((p: any) => {
          console.log(`  - "${p.title}" - ${p.url || 'URL yo\'q'}`)
        })
      }
    })

    process.exit(0)
  } catch (error) {
    console.error('Xatolik:', error)
    process.exit(1)
  }
}

checkCurrentProjects()