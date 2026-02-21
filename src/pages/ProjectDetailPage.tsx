import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectsService, Project } from '../services/projectsService'
import { AlertCircle, ArrowLeft, Link as LinkIcon, ExternalLink, Share2 } from 'lucide-react'

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchProject(id)
    }
  }, [id])

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true)
      const data = await projectsService.getProjectById(projectId)
      setProject(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Loyihani yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loyiha yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-red-400 mb-4">{error || 'Loyiha topilmadi'}</p>
          <button 
            onClick={() => navigate('/projects')}
            className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition"
          >
            Loyihalarga qaytish
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Faol'
      case 'completed': return 'Tugallangan'
      case 'planning': return 'Rejalashtirilmoqda'
      default: return 'Noma\'lum'
    }
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 text-slate-400 border border-slate-700/30 rounded-xl hover:bg-slate-800/40 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Orqaga
        </button>
      </div>

      {/* Project Header */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">
              {project.title.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
            <p className="text-slate-400 text-lg mb-4">{project.description}</p>
            
            {/* Status */}
            <div className="flex items-center gap-4 mb-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                <div className={`w-3 h-3 rounded-full ${
                  project.status === 'active' ? 'bg-blue-400' : 
                  project.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
                {getStatusText(project.status)}
              </span>
            </div>

            {/* URL */}
            {project.url && (
              <div className="flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-slate-400" />
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  {project.url}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
            <h2 className="text-xl font-bold text-white mb-4">Loyiha haqida</h2>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
              <h2 className="text-xl font-bold text-white mb-4">Texnologiyalar</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
            <h3 className="text-lg font-bold text-white mb-4">Tezkor harakatlar</h3>
            <div className="space-y-3">
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition flex items-center justify-center gap-2 font-medium"
                >
                  <ExternalLink className="w-5 h-5" />
                  Loyihani ochish
                </a>
              )}
              <button className="w-full py-3 px-4 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition flex items-center justify-center gap-2 font-medium">
                <Share2 className="w-5 h-5" />
                Ulashish
              </button>
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
            <h3 className="text-lg font-bold text-white mb-4">Loyiha ma'lumotlari</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Holat:</span>
                <span className="text-white">{getStatusText(project.status)}</span>
              </div>
              {project.createdAt && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Yaratilgan:</span>
                  <span className="text-white">
                    {new Date(project.createdAt).toLocaleDateString('uz-UZ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}