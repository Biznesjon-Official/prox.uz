import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { studentsService, Student, Warning } from '../services/studentsService'
import { AlertCircle, ArrowLeft, TrendingUp, Zap, Star, Calendar, Phone, LogOut, AlertTriangle, Award } from 'lucide-react'

export default function StudentProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [student, setStudent] = useState<Student | null>(null)
  const [warnings, setWarnings] = useState<Warning[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Check if viewing own profile
  const currentUser = (() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })()
  const isOwnProfile = currentUser?._id === id || currentUser?.id === id

  useEffect(() => {
    if (!id) return
    fetchStudent()

    // Android tab suspension fix: re-fetch when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && id) {
        fetchStudent()
      }
    }
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted && id) {
        fetchStudent()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [id])

  const fetchStudent = async () => {
    try {
      setLoading(true)
      const data = await studentsService.getStudentById(id!)
      setStudent(data)
      setWarnings(data.warnings || [])

      // Bloklangan o'quvchi o'z profilini ko'ra olmaydi
      if (isOwnProfile && data.is_blocked) {
        setError('blocked')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'O\'quvchi ma\'lumotlarini yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const getDaysSinceJoin = (student: Student) => {
    const dateStr = student.joinDate || student.created_at
    if (!dateStr) return 1
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return 1
    return Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)) + 1)
  }

  const getProgress = (step: number, days: number) => {
    return Math.max(0, Math.round((Number(step || 0) / Math.max(1, days)) * 100))
  }

  const getInitials = (name?: string) => {
    const safe = (name || '').trim()
    if (!safe) return 'U'
    return safe.split(/\s+/).slice(0, 2).map(p => (p[0] || '').toUpperCase()).join('') || 'U'
  }

  const getCertificates = () => {
    return [
      // Frontend Development (250 qadam)
      { name: 'HTML Asoslari', requiredSteps: 37 },
      { name: 'CSS Styling', requiredSteps: 75 }, // 37 + 38
      { name: 'Bootstrap Framework', requiredSteps: 87 }, // 75 + 12
      { name: 'JavaScript Fundamentals', requiredSteps: 121 }, // 87 + 34
      { name: 'Node.js Backend', requiredSteps: 161 }, // 121 + 40
      { name: 'Express + MongoDB', requiredSteps: 186 }, // 161 + 25
      { name: 'Deployment Skills', requiredSteps: 192 }, // 186 + 6
      { name: 'Coding Agent', requiredSteps: 214 }, // 192 + 22
      { name: 'Oson Sayt Yaratish', requiredSteps: 217 }, // 214 + 3
      { name: 'Qiyin Sayt Yaratish', requiredSteps: 220 }, // 217 + 3
      { name: 'Frontend Developer', requiredSteps: 250 }, // To'liq frontend

      // Python Development (350 qadam)
      { name: 'Python Fundamentals', requiredSteps: 310 }, // 250 + 60
      { name: 'Web Backend (Flask)', requiredSteps: 350 }, // 310 + 40
      { name: 'Data Analytics', requiredSteps: 410 }, // 350 + 60
      { name: 'Next.js Fullstack', requiredSteps: 480 }, // 410 + 70
      { name: 'AI Integration', requiredSteps: 520 }, // 480 + 40
      { name: 'Frontend-Backend Integration', requiredSteps: 560 }, // 520 + 40
      { name: 'Electron Desktop', requiredSteps: 575 }, // 560 + 15
      { name: 'DevOps & Docker', requiredSteps: 590 }, // 575 + 15
      { name: 'Final Capstone', requiredSteps: 595 }, // 590 + 5
      { name: 'Full Stack Developer', requiredSteps: 600 } // To'liq dasturchi
    ]
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Yuklanmoqda...</p>
      </div>
    )
  }

  if (error === 'blocked') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Profil bloklangan</h2>
        <p className="text-slate-400 text-sm text-center max-w-sm">To'lov bo'yicha qarzdorlik sababli profilingiz bloklangan. Iltimos, manager bilan bog'laning.</p>
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-red-400" />
        </div>
        <p className="text-red-400 text-sm">{error || "O'quvchi topilmadi"}</p>
        <div className="flex gap-3">
          <button onClick={() => { setError(''); fetchStudent() }} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">
            Qayta yuklash
          </button>
          <button onClick={() => navigate('/students')} className="px-4 py-2 bg-slate-700 text-white text-sm rounded-lg">
            Orqaga
          </button>
        </div>
      </div>
    )
  }

  const days = getDaysSinceJoin(student)
  const progress = getProgress(student.step, days)
  const isDebtor = progress < 100
  const joinDate = new Date(student.joinDate || student.created_at).toLocaleDateString('uz-UZ')

  return (
    <div className="space-y-5">
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
      {/* Back Button */}
      {!isOwnProfile && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Orqaga</span>
        </button>
      )}

      {/* Profile Header */}
      <div className={`p-5 rounded-xl border max-w-2xl mx-auto ${
        isDebtor ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/20'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
            isDebtor ? 'bg-red-500/15' : 'bg-emerald-500/15'
          }`}>
            <span className={`font-bold text-xl ${isDebtor ? 'text-red-400' : 'text-emerald-400'}`}>
              {getInitials(student.name)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{student.name || 'Nomsiz'}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                student.subscriptionPlan === 'Pro' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                  : student.subscriptionPlan === 'Premium'
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30'
                  : student.subscriptionPlan === 'Basic'
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
              }`}>
                {student.subscriptionPlan || 'Kurs'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${isDebtor ? 'text-red-400' : 'text-emerald-400'}`}>
              {progress}%
            </span>
            <p className="text-xs text-slate-500">Progress</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-500">Qadam</span>
          </div>
          <p className="text-lg font-bold text-white">{student.step || 0}</p>
        </div>
        
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-slate-500">Ball</span>
          </div>
          <p className="text-lg font-bold text-white">{student.totalBall || 0}</p>
        </div>
        
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-500">Kun</span>
          </div>
          <p className="text-lg font-bold text-white">{days}</p>
        </div>
        
        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-500">Sur'at</span>
          </div>
          <p className="text-lg font-bold text-white">{(student.step / days).toFixed(1)}/kun</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">Progress</span>
          <span className={`text-sm font-semibold ${isDebtor ? 'text-red-400' : 'text-emerald-400'}`}>
            {progress}%
          </span>
        </div>
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isDebtor ? 'bg-red-500' : 'bg-emerald-500'}`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {student.step || 0} qadam / {days} kun = {progress}%
        </p>
      </div>

      {/* Info */}
      <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 space-y-3 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Tarif</span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
            student.subscriptionPlan === 'Pro' 
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
              : student.subscriptionPlan === 'Premium'
              ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30'
              : student.subscriptionPlan === 'Basic'
              ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-slate-700/30 text-slate-400 border border-slate-600/30'
          }`}>
            {student.subscriptionPlan || 'Kurs'}
          </span>
        </div>
        {student.monthly_fee > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Oylik to'lov</span>
            <span className="text-white text-sm font-semibold">
              {student.monthly_fee.toLocaleString('uz-UZ')} so'm
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Telefon</span>
          <div className="flex items-center gap-2 text-white text-sm">
            <Phone className="w-4 h-4 text-slate-500" />
            {student.phone || '-'}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Kelgan sana</span>
          <span className="text-white text-sm">{joinDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Username</span>
          <span className="text-white text-sm">@{student.username || '-'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Holat</span>
          <span className={`text-sm ${student.is_blocked ? 'text-red-400' : 'text-emerald-400'}`}>
            {student.is_blocked ? 'Bloklangan' : 'Faol'}
          </span>
        </div>
      </div>

      {/* Warnings Cards */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Ogohlantirish ({warnings.length}/3)
        </h3>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[0, 1, 2].map((index) => {
            const warning = warnings[index]
            const hasWarning = !!warning
            
            return (
              <div
                key={index}
                className={`p-2 sm:p-4 rounded-xl border transition-all ${
                  hasWarning
                    ? 'bg-red-500/10 border-red-500/30 animate-pulse'
                    : 'bg-slate-800/30 border-slate-700/30 opacity-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`w-3 h-3 sm:w-4 sm:h-4 ${hasWarning ? 'text-red-400' : 'text-slate-600'}`} />
                  <span className={`text-[10px] sm:text-sm font-medium ${hasWarning ? 'text-red-400' : 'text-slate-600'}`}>
                    Ogohlantirish #{index + 1}
                  </span>
                </div>
                
                {hasWarning ? (
                  <div>
                    <p className="text-[11px] sm:text-sm text-white mb-2">{warning.reason}</p>
                    <div className="text-[10px] sm:text-xs text-slate-400">
                      <p>{new Date(warning.date).toLocaleDateString('uz-UZ')}</p>
                      <p>Bergan: {warning.given_by}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] sm:text-sm text-slate-600 mb-2">Ogohlantirish yo'q</p>
                    <div className="text-[10px] sm:text-xs text-slate-700">
                      <p>—</p>
                      <p>—</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {student?.is_blocked && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-400">O'quvchi bloklangan</p>
              <p className="text-xs text-red-400/70">3 ta ogohlantirish tufayli faoliyat cheklangan</p>
            </div>
          </div>
        )}
      </div>

      {/* Certificates Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Sertifikatlar
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {getCertificates().map((cert, index) => {
            const isEarned = (student?.step || 0) >= cert.requiredSteps
            
            return (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden transition-all hover:scale-105 ${
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                    : 'bg-slate-800/30 border border-slate-700/30 opacity-50'
                }`}
                style={{ aspectRatio: '16/9' }}
              >
                {/* Certificate Background */}
                <div className={`absolute inset-0 ${
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-400/10 via-orange-400/10 to-red-400/10'
                    : 'bg-slate-700/20'
                }`}>
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1 left-1 w-4 h-4 border border-current rounded-full"></div>
                    <div className="absolute top-1 right-1 w-3 h-3 border border-current rounded-full"></div>
                    <div className="absolute bottom-1 left-1 w-3 h-3 border border-current rounded-full"></div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 border border-current rounded-full"></div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="relative z-10 p-2 h-full flex flex-col justify-between">
                  <div className="text-center">
                    <Award className={`w-4 h-4 sm:w-3 sm:h-3 mx-auto mb-1 ${
                      isEarned ? 'text-yellow-400' : 'text-slate-600'
                    }`} />
                    <h4 className={`text-xs sm:text-[10px] font-bold ${
                      isEarned ? 'text-yellow-400' : 'text-slate-600'
                    }`}>
                      SERTIFIKAT
                    </h4>
                  </div>

                  <div className="text-center px-1">
                    <p className={`text-xs sm:text-[9px] font-medium mb-1 leading-tight ${
                      isEarned ? 'text-white' : 'text-slate-600'
                    }`}>
                      {cert.name}
                    </p>
                    <p className={`text-xs sm:text-[8px] ${
                      isEarned ? 'text-yellow-300' : 'text-slate-700'
                    }`}>
                      {cert.requiredSteps} qadam
                    </p>
                  </div>

                  <div className="text-center">
                    <p className={`text-xs sm:text-[8px] ${
                      isEarned ? 'text-yellow-400' : 'text-slate-700'
                    }`}>
                      #{(index + 1).toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>

                {/* Lock overlay for unearned certificates */}
                {!isEarned && (
                  <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 sm:w-6 sm:h-6 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-1">
                        <span className="text-slate-400 text-xs sm:text-[10px]">🔒</span>
                      </div>
                      <p className="text-xs sm:text-[8px] text-slate-500">Qulflangan</p>
                    </div>
                  </div>
                )}

                {/* Shine effect for earned certificates */}
                {isEarned && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
