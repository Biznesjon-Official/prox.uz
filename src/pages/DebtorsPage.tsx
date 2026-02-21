import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { studentsService, Student } from '../services/studentsService'
import { AlertCircle, Search, TrendingDown, Wallet } from 'lucide-react'

export default function DebtorsPage() {
  const navigate = useNavigate()
  const [debtors, setDebtors] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchDebtors()
  }, [])

  const getDaysSinceJoin = (student: Student) => {
    const dateStr = student.joinDate || student.created_at
    if (!dateStr) return 1
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return 1
    return Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1)
  }

  const getProgress = (step: number, days: number) => Math.max(0, Math.round((Number(step || 0) / Math.max(1, days)) * 100))

  const fetchDebtors = async () => {
    try {
      const data = await studentsService.getAllStudents()
      const debtorsOnly = (data || []).filter((s) => getProgress(s.step, getDaysSinceJoin(s)) < 100)
      setDebtors(debtorsOnly)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xatolik')
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (name?: string) => {
    const safe = (name || '').trim()
    if (!safe) return 'U'
    return safe.split(/\s+/).slice(0, 2).map(p => (p[0] || '').toUpperCase()).join('') || 'U'
  }

  const filteredDebtors = debtors
    .filter(s => (s.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
    .sort((a, b) => getProgress(a.step, getDaysSinceJoin(a)) - getProgress(b.step, getDaysSinceJoin(b)))

  const stats = {
    total: debtors.length,
    avgProgress: debtors.length > 0
      ? Math.round(debtors.reduce((sum, s) => sum + getProgress(s.step || 0, getDaysSinceJoin(s)), 0) / debtors.length)
      : 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <button onClick={fetchDebtors} className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg">Qayta</button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-lg font-bold text-white">Qarzdorlar</h1>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <Wallet className="w-3.5 h-3.5 text-red-400" />
            <span className="text-slate-400">Jami:</span>
            <span className="font-medium text-white">{stats.total}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <TrendingDown className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-slate-400">O'rtacha:</span>
            <span className="font-medium text-orange-400">{stats.avgProgress}%</span>
          </div>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50"
        />
      </div>

      {filteredDebtors.length === 0 ? (
        <div className="text-center py-12">
          <Wallet className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">{searchTerm ? 'Topilmadi' : 'Qarzdorlar yo\'q'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredDebtors.map((student) => {
            const days = getDaysSinceJoin(student)
            const progress = getProgress(student.step, days)
            
            return (
              <div
                key={student._id}
                onClick={() => navigate(`/student/${student._id}`)}
                className={`flex items-center gap-2.5 px-3 py-2 bg-slate-800/30 hover:bg-slate-800/50 border border-red-500/20 hover:border-red-500/30 rounded-lg cursor-pointer transition ${student.is_blocked ? 'opacity-50' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-500/15">
                  <span className="font-semibold text-xs text-red-400">{getInitials(student.name)}</span>
                </div>
                <span className="flex-1 font-medium text-white text-sm truncate">{student.name || 'Nomsiz'}</span>
                <span className="text-xs font-semibold text-red-400">{progress}%</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
