import mongoose from 'mongoose'
import Project from '../models/Project'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const projectUrls = [
  { title: 'Prox Academy', url: 'https://prox.uz/' },
  { title: 'Alibobo Qurilish', url: 'https://aliboboqurilish.uz/' },
  { title: 'Alochi Bolajon', url: 'https://alochibolajon.uz/' },
  { title: 'Biznes Jon', url: 'https://biznesjon.uz/' },
  { title: 'Usta Jon', url: 'https://ustajon.uz/' },
  { title: 'Mental Jon', url: 'https://mentaljon.uz/' }
]

async function updateProjectUrls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('MongoDB ga ulandi')

    for (const projectData of projectUrls) {
      const project = await Project.findOne({ 
        title: { $regex: new RegExp(projectData.title, 'i') } 
      })

      if (project) {
        project.url = projectData.url
        await project.save()
        console.log(`✅ ${projectData.title} loyihasiga URL qo'shildi: ${projectData.url}`)
      } else {
        // Agar loyiha topilmasa, yangi loyiha yaratamiz
        const newProject = new Project({
          title: projectData.title,
          description: `${projectData.title} - professional web sayt`,
          technology: 'Web Development',
          technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
          students: 1,
          status: 'completed',
          progress: 100,
          deadline: new Date(),
          url: projectData.url
        })
        
        await newProject.save()
        console.log(`✅ Yangi loyiha yaratildi: ${projectData.title} - ${projectData.url}`)
      }
    }

    console.log('Barcha loyihalar muvaffaqiyatli yangilandi!')
    process.exit(0)
  } catch (error) {
    console.error('Xatolik:', error)
    process.exit(1)
  }
}

updateProjectUrls()