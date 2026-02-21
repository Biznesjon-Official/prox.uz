import { useState, useEffect } from 'react'
import { projectsService, Project } from '../services/projectsService'
import { AlertCircle, Folder, ExternalLink } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const data = await projectsService.getAllProjects()
      setProjects(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xatolik')
    } finally {
      setLoading(false)
    }
  }

  const getProjectLogo = (project: Project): string | null => {
    if (project.logo) return project.logo
    const title = project.title?.toLowerCase() || ''
    if (title.includes('bolajon')) return '/loyihalar/bolajon.png'
    if (title.includes('alochi')) return '/loyihalar/alochi.jpg'
    if (title.includes('mental')) return '/loyihalar/Mentaljon.png'
    if (title.includes('prox')) return '/loyihalar/prox.jpg'
    if (title.includes('mukammal')) return '/loyihalar/mukammalotaona.png'
    if (title.includes('alibobo')) return '/loyihalar/alibobo.png'
    if (title.includes('avtofix')) return '/loyihalar/avtofix.webp'
    if (title.includes('avtojon')) return '/loyihalar/avtojon.png'
    return null
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': return { text: 'Faol', color: 'text-emerald-400', bg: 'bg-emerald-500/20' }
      case 'completed': return { text: 'Tugallangan', color: 'text-violet-400', bg: 'bg-violet-500/20' }
      case 'planning': return { text: 'Rejada', color: 'text-amber-400', bg: 'bg-amber-500/20' }
      default: return { text: 'Noma\'lum', color: 'text-slate-400', bg: 'bg-slate-500/20' }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <button onClick={fetchProjects} className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg">Qayta</button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">Loyihalar</h1>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50 text-xs">
          <Folder className="w-3.5 h-3.5 text-violet-400" />
          <span className="font-medium text-white">{projects.length}</span>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <Folder className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">Loyihalar yo'q</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => {
            const status = getStatusConfig(project.status)
            const logo = getProjectLogo(project)
            
            return (
              <div 
                key={project._id}
                onClick={() => project.url && window.open(project.url, '_blank')}
                className={`group bg-slate-800/40 rounded-xl border border-slate-700/40 p-4 transition hover:bg-slate-800/60 hover:border-slate-600/50 ${project.url ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden">
                    {logo ? (
                      <img src={logo} alt={project.title} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                        <span className="text-xl font-bold text-white">{project.title?.charAt(0)?.toUpperCase() || 'P'}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.bg} ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs line-clamp-2 mb-3">{project.description || 'Ma\'lumot yo\'q'}</p>
                {project.url && (
                  <div className="flex items-center gap-1.5 text-violet-400 text-xs">
                    <span>Saytga o'tish</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
