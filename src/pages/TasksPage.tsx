import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { stepsService, Step } from '../services/stepsService'
import { submissionService } from '../services/submissionService'
import StepWorkflow from '../components/StepWorkflow'
import { 
  AlertCircle, FileText, RefreshCw, 
  Check, Lock, Play, LayoutGrid, LayoutList, Loader2, Ban
} from 'lucide-react'

export default function TasksPage() {
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [workflowStep, setWorkflowStep] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isBlocked, setIsBlocked] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  let viewerRole: string | null = null
  let currentUser: any = null
  try {
    const raw = localStorage.getItem('user')
    const parsed = raw ? JSON.parse(raw) : null
    viewerRole = parsed?.role || null
    currentUser = parsed
  } catch {
    viewerRole = null
    currentUser = null
  }
  const isStudentViewer = viewerRole === 'student'
  const isAdmin = viewerRole === 'admin'

  // O'quvchi bloklangan yoki yo'qligini tekshirish
  useEffect(() => {
    if (currentUser?.is_blocked) {
      setIsBlocked(true)
    }
    // PaymentStatus dan ham tekshirish
    try {
      const paymentStatus = localStorage.getItem('paymentStatus')
      if (paymentStatus) {
        const parsed = JSON.parse(paymentStatus)
        if (parsed?.isBlocked) {
          setIsBlocked(true)
        }
      }
    } catch {}
  }, [])

  // Qadamlarni yuklash
  const fetchSteps = useCallback(async (pageNum: number, reset: boolean = false) => {
    try {
      if (reset) {
        setLoading(true)
        setPage(1)
      } else {
        setLoadingMore(true)
      }
      
      const data = await stepsService.getSteps(pageNum, 10)
      
      if (reset) {
        setSteps(data.steps)
      } else {
        setSteps(prev => [...prev, ...data.steps])
      }
      
      setHasMore(data.hasMore)
      setPage(pageNum)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Qadamlarni yuklashda xatolik')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Submissions yuklash - MongoDB dan progress olish
  const fetchSubmissions = async () => {
    try {
      // Yangi API - steps progress
      const data = await stepsService.getProgress()
      
      // Completed steps ni aniqlash
      const completed = new Set<number>()
      if (data.progress && Array.isArray(data.progress)) {
        data.progress.forEach((p: any) => {
          if (p.status === 'completed') {
            completed.add(p.stepNumber)
          }
        })
      }
      setCompletedSteps(completed)
    } catch (err) {
      console.error('Progress yuklashda xatolik:', err)
      // Fallback - eski usul
      try {
        const data = await submissionService.getStudentSubmissions()
        
        const completed = new Set<number>()
        if (Array.isArray(data)) {
          data.forEach((sub: any) => {
            if (sub.status === 'approved' || (sub.status === 'reviewed' && sub.aiReview?.score >= 70)) {
              const stepNum = sub.stepNumber || sub.taskId?.stepNumber
              if (stepNum) completed.add(stepNum)
            }
          })
        }
        setCompletedSteps(completed)
      } catch {
        // ignore
      }
    }
  }

  // Initial load
  useEffect(() => {
    fetchSteps(1, true)
    if (isStudentViewer) {
      fetchSubmissions()
    }
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          fetchSteps(page + 1)
        }
      },
      { threshold: 0.1 }
    )
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }
    
    return () => observerRef.current?.disconnect()
  }, [hasMore, loadingMore, loading, page, fetchSteps])

  const isStepCompleted = (stepNumber: number) => {
    return completedSteps.has(stepNumber)
  }

  const firstIncompleteStep = useMemo(() => {
    for (const step of steps) {
      if (!completedSteps.has(step.stepNumber)) return step.stepNumber
    }
    return steps.length > 0 ? steps[steps.length - 1].stepNumber + 1 : 1
  }, [steps, completedSteps])

  const isStepLocked = (stepNumber: number) => {
    if (!isStudentViewer) return false
    if (isAdmin) return false
    return stepNumber > firstIncompleteStep
  }

  const handleStartStep = (stepNumber: number) => {
    // Bloklangan o'quvchi uchun ogohlantirish
    if (isBlocked) {
      return // Modal ochilmaydi
    }
    setWorkflowStep(stepNumber)
  }

  const handleStepComplete = async (stepNumber: number) => {
    // Local state ni yangilash
    setCompletedSteps(prev => new Set([...prev, stepNumber]))
    // MongoDB dan yangi ma'lumotlarni olish
    await fetchSubmissions()
  }

  const handleRefresh = async () => {
    await fetchSteps(1, true)
    if (isStudentViewer) {
      await fetchSubmissions()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Qadamlar yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => fetchSteps(1, true)}
            className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Bloklangan o'quvchi uchun ogohlantirish */}
      {isBlocked && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Ban className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-400">To'lov muddati tugagan</h3>
            <p className="text-xs text-red-400/70">Qadam topshirish uchun to'lovni amalga oshiring. Admin bilan bog'laning.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Qadamlar</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5 hidden sm:block">O'quv qadamlaringiz</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/50 rounded-lg p-0.5 border border-slate-700/30">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 sm:p-2 rounded-md transition ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 sm:p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 sm:px-3 sm:py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Yangilash</span>
          </button>
        </div>
      </div>

      {/* Steps - Grid or List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {steps.map(step => {
            const locked = isStepLocked(step.stepNumber)
            const completed = isStepCompleted(step.stepNumber)

            return (
              <div
                key={step.stepNumber}
                className={`bg-slate-800/40 rounded-xl border p-4 transition-all ${
                  completed 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : locked 
                      ? 'border-slate-700/30 opacity-50' 
                      : 'border-slate-700/30 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    completed ? 'bg-green-500' : locked ? 'bg-slate-700' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {completed ? <Check className="w-5 h-5 text-white" /> : locked ? <Lock className="w-4 h-4 text-slate-400" /> : <span className="text-sm font-bold text-white">{step.stepNumber}</span>}
                  </div>
                  <span className="text-xs text-slate-400">{step.category}</span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1 truncate">{step.title}</h3>
                <p className="text-xs text-slate-400 mb-3">
                  {step.testsCount || 5} ta test • {step.points} ball
                </p>

                {completed ? (
                  <button
                    onClick={() => !isBlocked && handleStartStep(step.stepNumber)}
                    disabled={isBlocked}
                    className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                      isBlocked 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                    }`}
                  >
                    {isBlocked ? <Ban className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isBlocked ? "To'lov kerak" : "Qayta ko'rish"}
                  </button>
                ) : (
                  <button
                    onClick={() => !locked && !isBlocked && handleStartStep(step.stepNumber)}
                    disabled={locked || isBlocked}
                    className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                      isBlocked
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed'
                        : locked 
                          ? 'bg-slate-700/50 text-slate-500' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}
                  >
                    {isBlocked ? <Ban className="w-3 h-3" /> : locked ? <Lock className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isBlocked ? "To'lov kerak" : locked ? 'Bloklangan' : 'Boshlash'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3">
          {steps.map(step => {
            const locked = isStepLocked(step.stepNumber)
            const completed = isStepCompleted(step.stepNumber)

            return (
              <div
                key={step.stepNumber}
                className={`bg-slate-800/40 rounded-xl border transition-all ${
                  completed 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : locked 
                      ? 'border-slate-700/30 opacity-50' 
                      : 'border-slate-700/30 hover:border-blue-500/30'
                }`}
              >
                <div className="p-3 sm:p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${
                    completed ? 'bg-green-500' : locked ? 'bg-slate-700' : 'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {completed ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : locked ? <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" /> : <span className="text-xs sm:text-sm font-bold text-white">{step.stepNumber}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">{step.title}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400">
                      {step.testsCount || 5} ta test • {step.points} ball • {step.category}
                    </p>
                  </div>

                  {completed ? (
                    <button
                      onClick={() => !isBlocked && handleStartStep(step.stepNumber)}
                      disabled={isBlocked}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium shrink-0 transition flex items-center gap-1.5 ${
                        isBlocked
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                      }`}
                    >
                      {isBlocked ? <Ban className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span className="hidden sm:inline">{isBlocked ? "To'lov" : "Qayta"}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => !locked && !isBlocked && handleStartStep(step.stepNumber)}
                      disabled={locked || isBlocked}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium flex items-center gap-1.5 transition shrink-0 ${
                        isBlocked
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20 cursor-not-allowed'
                          : locked 
                            ? 'bg-slate-700/50 text-slate-500' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      }`}
                    >
                      {isBlocked ? <Ban className="w-3 h-3" /> : locked ? <Lock className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span className="hidden sm:inline">{isBlocked ? "To'lov" : locked ? 'Bloklangan' : 'Boshlash'}</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {loadingMore && (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Yuklanmoqda...</span>
          </div>
        )}
      </div>

      {/* Empty State */}
      {steps.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Qadamlar topilmadi</h3>
          <p className="text-slate-400 text-sm">Hozircha qadamlar mavjud emas</p>
        </div>
      )}

      {/* Step Workflow Modal */}
      {workflowStep !== null && (
        <StepWorkflow
          stepNumber={workflowStep}
          onClose={() => {
            setWorkflowStep(null)
            handleRefresh()
          }}
          onStepComplete={handleStepComplete}
        />
      )}
    </div>
  )
}
