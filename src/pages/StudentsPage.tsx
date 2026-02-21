import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { studentsService, Student } from '../services/studentsService'
import { AlertCircle, Search, Users, TrendingUp, AlertTriangle } from 'lucide-react'

export default function StudentsPage() {
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    fetchStudents()

    // Android tab suspension fix
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchStudents()
      }
    }
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) fetchStudents()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  const fetchStudents = async () => {
    try {
      const data = await studentsService.getAllStudents()
      setStudents(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleStudentClick = async (student: Student) => {
    // Har doim profil sahifasiga o'tkazish
    navigate(`/student/${student._id}`)
  }



  const getDaysSinceJoin = (student: Student) => {
    const dateStr = student.joinDate || student.created_at
    if (!dateStr) return 1
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return 1
    return Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1)
  }

  const getProgress = (step: number, days: number) => Math.max(0, Math.round((Number(step || 0) / Math.max(1, days)) * 100))

  const getInitials = (name?: string) => {
    const safe = (name || '').trim()
    if (!safe) return 'U'
    return safe.split(/\s+/).slice(0, 2).map(p => (p[0] || '').toUpperCase()).join('') || 'U'
  }

  const filteredStudents = students
    .filter(s => (s.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
    .sort((a, b) => getProgress(b.step, getDaysSinceJoin(b)) - getProgress(a.step, getDaysSinceJoin(a)))

  const stats = {
    total: students.length,
    avgProgress: students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + getProgress(s.step || 0, getDaysSinceJoin(s)), 0) / students.length)
      : 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-red-400 text-sm">{error}</p>
        <button onClick={fetchStudents} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg">Qayta</button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-lg font-bold text-white">O'quvchilar</h1>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium text-white">{stats.total}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-white">{stats.avgProgress}%</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="O'quvchi qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">O'quvchilar topilmadi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStudents.map((student) => {
            const progress = getProgress(student.step, getDaysSinceJoin(student))
            const isDebtor = progress < 100
            const warningCount = student.warnings?.length || 0

            return (
              <div
                key={student._id}
                onClick={() => handleStudentClick(student)}
                className={`p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.02] ${
                  student.is_blocked
                    ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                    : isDebtor 
                      ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40' 
                      : 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    student.is_blocked
                      ? 'bg-red-500/15'
                      : isDebtor ? 'bg-red-500/15' : 'bg-emerald-500/15'
                  }`}>
                    <span className={`font-bold text-lg ${
                      student.is_blocked
                        ? 'text-red-400'
                        : isDebtor ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                      {getInitials(student.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">{student.name || 'Nomsiz'}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-xs text-slate-500">@{student.username || 'noma\'lum'}</p>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        student.subscriptionPlan === 'Pro' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : student.subscriptionPlan === 'Premium'
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          : student.subscriptionPlan === 'Basic'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
                      }`}>
                        {student.subscriptionPlan || 'Kurs'}
                      </span>
                    </div>
                  </div>
                  {/* Warning indicator */}
                  {warningCount > 0 && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className={`w-4 h-4 ${warningCount >= 3 ? 'text-red-400' : 'text-yellow-400'}`} />
                      <span className={`text-xs font-bold ${warningCount >= 3 ? 'text-red-400' : 'text-yellow-400'}`}>
                        {warningCount}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Progress</span>
                    <span className={`font-semibold ${
                      student.is_blocked
                        ? 'text-red-400'
                        : isDebtor ? 'text-red-400' : 'text-emerald-400'
                    }`}>
                      {progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        student.is_blocked
                          ? 'bg-red-500'
                          : isDebtor ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{student.step || 0} qadam</span>
                    <span>{student.totalBall || 0} ball</span>
                  </div>
                  {student.is_blocked && (
                    <div className="text-xs text-red-400 font-medium">Bloklangan</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}