import { useState, useEffect } from 'react'
import { projectsService, Project } from '../services/projectsService'
import { AlertCircle, Folder, ExternalLink, Plus, Pencil, Trash2, X } from 'lucide-react'

interface ProjectForm {
  title: string
  description: string
  technology: string
  technologies: string
  students: number
  status: 'active' | 'completed' | 'planning'
  progress: number
  deadline: string
  url: string
  logo: string
}

const emptyForm: ProjectForm = {
  title: '',
  description: '',
  technology: '',
  technologies: '',
  students: 1,
  status: 'planning',
  progress: 0,
  deadline: '',
  url: '',
  logo: ''
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProjectForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role === 'mentor' || user.role === 'admin'

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

  const openCreateModal = () => {
    setForm(emptyForm)
    setEditingId(null)
    setModalOpen(true)
  }

  const openEditModal = (project: Project) => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      technology: project.technology || '',
      technologies: (project.technologies || []).join(', '),
      students: project.students || 1,
      status: project.status || 'planning',
      progress: project.progress || 0,
      deadline: project.deadline ? project.deadline.split('T')[0] : '',
      url: project.url || '',
      logo: project.logo || ''
    })
    setEditingId(project._id)
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.description || !form.technology || !form.deadline) return
    setSaving(true)
    try {
      const payload = {
        title: form.title,
        description: form.description,
        technology: form.technology,
        technologies: form.technologies ? form.technologies.split(',').map(t => t.trim()).filter(Boolean) : [],
        students: form.students,
        status: form.status,
        progress: form.progress,
        deadline: form.deadline,
        url: form.url || undefined,
        logo: form.logo || undefined
      }
      if (editingId) {
        await projectsService.updateProject(editingId, payload)
      } else {
        await projectsService.createProject(payload)
      }
      setModalOpen(false)
      await fetchProjects()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Saqlashda xatolik')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await projectsService.deleteProject(id)
      setDeleteConfirm(null)
      await fetchProjects()
    } catch (err: any) {
      setError(err.response?.data?.message || 'O\'chirishda xatolik')
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
        <button onClick={() => { setError(''); fetchProjects() }} className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg">Qayta</button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-white">Loyihalar</h1>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              onClick={openCreateModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Loyiha qo'shish
            </button>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50 text-xs">
            <Folder className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-medium text-white">{projects.length}</span>
          </div>
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
                className={`group relative bg-slate-800/40 rounded-xl border border-slate-700/40 p-4 transition hover:bg-slate-800/60 hover:border-slate-600/50`}
              >
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEditModal(project) }}
                      className="p-1.5 bg-slate-700/80 hover:bg-violet-600 rounded-lg transition"
                      title="Tahrirlash"
                    >
                      <Pencil className="w-3 h-3 text-slate-300" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteConfirm(project._id) }}
                      className="p-1.5 bg-slate-700/80 hover:bg-red-600 rounded-lg transition"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3 h-3 text-slate-300" />
                    </button>
                  </div>
                )}

                {/* Delete confirmation */}
                {deleteConfirm === project._id && (
                  <div className="absolute inset-0 bg-slate-900/95 rounded-xl flex flex-col items-center justify-center gap-3 z-20 p-4">
                    <p className="text-sm text-white text-center">O'chirishni tasdiqlaysizmi?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs rounded-lg transition"
                      >
                        Ha, o'chirish
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition"
                      >
                        Bekor
                      </button>
                    </div>
                  </div>
                )}

                <div
                  onClick={() => project.url && window.open(project.url, '_blank')}
                  className={project.url ? 'cursor-pointer' : ''}
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
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">
                {editingId ? 'Loyihani tahrirlash' : 'Yangi loyiha'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-slate-700 rounded-lg transition">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Nomi *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  placeholder="Loyiha nomi"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Tavsif *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                  placeholder="Loyiha haqida"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Texnologiya *</label>
                  <input
                    value={form.technology}
                    onChange={(e) => setForm({ ...form, technology: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    placeholder="React, Node.js"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Texnologiyalar</label>
                  <input
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    placeholder="React, TS, Node"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Talabalar</label>
                  <input
                    type="number"
                    min={0}
                    value={form.students}
                    onChange={(e) => setForm({ ...form, students: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as ProjectForm['status'] })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="planning">Rejada</option>
                    <option value="active">Faol</option>
                    <option value="completed">Tugallangan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Progress</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={form.progress}
                    onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Deadline *</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">URL</label>
                  <input
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Logo</label>
                  <input
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    placeholder="/loyihalar/logo.png"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition"
              >
                Bekor
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.description || !form.technology || !form.deadline}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition"
              >
                {saving ? 'Saqlanmoqda...' : editingId ? 'Saqlash' : 'Qo\'shish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
