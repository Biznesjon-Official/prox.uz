import mongoose from 'mongoose'
import Project from '../models/Project'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function removeDuplicateProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('MongoDB ga ulandi')

    // Get all projects
    const projects = await Project.find().sort({ createdAt: 1 }) // Eng eskisini birinchi saqlash uchun
    console.log(`Jami loyihalar: ${projects.length}`)

    // Normalize title function
    const normalizeTitle = (title: string) => {
      return title.toLowerCase()
        .replace(/\s+/g, '') // Remove all spaces
        .replace(/[^\w]/g, '') // Remove special characters
    }

    // Group projects by normalized title
    const projectGroups = new Map()
    
    for (const project of projects) {
      const normalizedTitle = normalizeTitle(project.title)
      if (!projectGroups.has(normalizedTitle)) {
        projectGroups.set(normalizedTitle, [])
      }
      projectGroups.get(normalizedTitle).push(project)
    }

    let duplicatesRemoved = 0

    // Remove duplicates, keep the one with URL if available, otherwise keep the first one
    for (const [normalizedTitle, projectList] of projectGroups) {
      if (projectList.length > 1) {
        console.log(`\n"${normalizedTitle}" loyihasidan ${projectList.length} ta nusxa topildi:`)
        
        // Sort by: 1) has URL, 2) creation date
        projectList.sort((a, b) => {
          if (a.url && !b.url) return -1
          if (!a.url && b.url) return 1
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        })
        
        const projectToKeep = projectList[0]
        console.log(`  ✅ Saqlandi: "${projectToKeep.title}" - ${projectToKeep.url || 'URL yo\'q'}`)
        
        // Remove the rest
        for (let i = 1; i < projectList.length; i++) {
          const projectToDelete = projectList[i]
          await Project.findByIdAndDelete(projectToDelete._id)
          console.log(`  ❌ O'chirildi: "${projectToDelete.title}" - ${projectToDelete.url || 'URL yo\'q'}`)
          duplicatesRemoved++
        }
      }
    }

    console.log(`\n📊 Natija:`)
    console.log(`- Jami loyihalar: ${projects.length}`)
    console.log(`- O'chirilgan takroriy loyihalar: ${duplicatesRemoved}`)
    console.log(`- Qolgan loyihalar: ${projects.length - duplicatesRemoved}`)

    // Show remaining projects
    const remainingProjects = await Project.find().sort({ title: 1 })
    console.log(`\n📋 Qolgan loyihalar:`)
    remainingProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} - ${project.url || 'URL yo\'q'}`)
    })

    console.log('\nTakroriy loyihalar muvaffaqiyatli o\'chirildi!')
    process.exit(0)
  } catch (error) {
    console.error('Xatolik:', error)
    process.exit(1)
  }
}

removeDuplicateProjects()