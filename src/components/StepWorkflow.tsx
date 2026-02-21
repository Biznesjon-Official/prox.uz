import { useState, useEffect } from 'react'
import { stepsService, Step, Test } from '../services/stepsService'
import { X, ArrowLeft, ArrowRight, Code, FileText, Loader2, XCircle, AlertTriangle, Lightbulb, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

interface StepWorkflowProps {
  stepNumber: number
  onClose: () => void
  onStepComplete: (stepNumber: number) => void
}

type WorkflowStage = 'loading' | 'tests' | 'lesson' | 'completed' | 'success' | 'error'

// Success Modal Component
const SuccessModal = ({ onClose, stepNumber }: { onClose: () => void; stepNumber: number }) => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
    <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center animate-scale-in">
      <style>{`
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes check-draw { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
        @keyframes circle-fill { 0% { transform: scale(0); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-check { animation: check-draw 0.6s ease-out 0.3s forwards; stroke-dasharray: 100; stroke-dashoffset: 100; }
        .animate-circle { animation: circle-fill 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
      <div className="w-24 h-24 mx-auto mb-6 relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-circle"></div>
        <svg className="w-24 h-24 relative z-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="3" className="animate-circle" />
          <path d="M30 50 L45 65 L70 35" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-check" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Tabriklaymiz! 🎉</h2>
      <p className="text-slate-400 mb-6">{stepNumber}-qadam muvaffaqiyatli yakunlandi!</p>
      <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition">
        Davom etish
      </button>
    </div>
  </div>
)

// Error Modal Component
const ErrorModal = ({ errors, onRetry, onClose }: { errors: string[]; onRetry: () => void; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
    <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center animate-scale-in">
      <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
        <XCircle className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Xatolik topildi</h2>
      <p className="text-slate-400 mb-4">Quyidagi xatolarni tuzating:</p>
      <div className="bg-slate-900/50 rounded-xl p-4 mb-6 text-left max-h-48 overflow-y-auto">
        {errors.map((error, idx) => (
          <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition">Yopish</button>
        <button onClick={onRetry} className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">Qayta urinish</button>
      </div>
    </div>
  </div>
)


export default function StepWorkflow({ stepNumber, onClose, onStepComplete }: StepWorkflowProps) {
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('loading')
  const [step, setStep] = useState<Step | null>(null)
  const [tests, setTests] = useState<Test[]>([])
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [lessonContent, setLessonContent] = useState('')
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({})
  const [testResults, setTestResults] = useState<Record<number, { selectedIndex: number; correctIndex: number; isCorrect: boolean }>>({})
  const [submitting, setSubmitting] = useState(false)
  const [optionsAnimKey, setOptionsAnimKey] = useState(0)
  const [lessonReview, setLessonReview] = useState<any>(null)
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  const variants = ['A', 'B', 'C', 'D']

  // Qadam ma'lumotlarini yuklash
  useEffect(() => {
    const loadStep = async () => {
      try {
        const stepData = await stepsService.getStep(stepNumber)
        setStep(stepData)
        
        // StarterCode ni code editorga qo'yish
        if (stepData.codeTask?.starterCode) {
          setLessonContent(stepData.codeTask.starterCode)
        }
        
        if (stepData.tests && stepData.tests.length > 0) {
          setTests(stepData.tests)
          setCurrentStage('tests')
        } else {
          setCurrentStage('lesson')
        }
      } catch (err) {
        console.error('Qadam yuklashda xatolik:', err)
        setCurrentStage('lesson')
      }
    }
    loadStep()
  }, [stepNumber])

  // Body scroll lock
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [])

  // Options animation
  useEffect(() => {
    if (currentStage === 'tests') setOptionsAnimKey(prev => prev + 1)
  }, [currentStage, currentTestIndex])

  const handleSubmitTest = async () => {
    const currentTest = tests[currentTestIndex]
    if (!currentTest || testAnswers[currentTestIndex] === undefined) return
    
    const selectedIndex = testAnswers[currentTestIndex]
    const correctIndex = currentTest.correctAnswer
    const isCorrect = selectedIndex === correctIndex
    
    setTestResults(prev => ({ ...prev, [currentTestIndex]: { selectedIndex, correctIndex, isCorrect } }))
    
    if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex(prev => prev + 1)
    } else {
      setCurrentStage('lesson')
    }
  }

  const handlePrevTest = () => {
    if (currentTestIndex > 0) setCurrentTestIndex(prev => prev - 1)
  }

  const handleNextTest = async () => {
    if (tests.length === 0) { setCurrentStage('lesson'); return }
    await handleSubmitTest()
  }


  const handleSubmitLesson = async () => {
    if (!lessonContent.trim()) return
    try {
      setSubmitting(true)
      const data = await stepsService.submitStep(stepNumber, lessonContent)
      if (data.submission) {
        setLessonReview(data.submission)
        setCurrentStage('completed')
      }
    } catch { 
      alert('Xatolik yuz berdi') 
    } finally { 
      setSubmitting(false) 
    }
  }

  const handleRestartStep = () => {
    setCurrentStage('tests')
    setCurrentTestIndex(0)
    setTestAnswers({})
    setTestResults({})
    setLessonContent(step?.codeTask?.starterCode || '')
    setLessonReview(null)
    setErrorMessages([])
    setShowHints(false)
    setShowSolution(false)
  }

  // Results calculation
  const totalTests = tests.length
  const correctTests = Object.values(testResults).filter(r => r.isCorrect).length
  const allTestsPassed = totalTests === 0 || correctTests === totalTests
  const codeScore = lessonReview?.aiReview?.score ?? null
  const codeErrors = lessonReview?.aiReview?.errors || []
  const allCodePassed = codeScore !== null && codeScore >= 70 && codeErrors.length === 0
  const codeReviewed = lessonReview?.aiReview !== undefined
  const stepPassed = allTestsPassed && codeReviewed && allCodePassed

  // Check for errors
  useEffect(() => {
    if (currentStage === 'completed' && codeReviewed) {
      const errors: string[] = []
      if (!allTestsPassed) {
        Object.entries(testResults).filter(([, r]) => !r.isCorrect).forEach(([idx]) => {
          errors.push(`Test ${Number(idx) + 1}: Noto'g'ri javob`)
        })
      }
      if (codeErrors.length > 0) {
        codeErrors.forEach((err: any) => errors.push(err.message || 'Kod xatosi'))
      }
      if (errors.length > 0) {
        setErrorMessages(errors)
        setCurrentStage('error')
      } else if (stepPassed) {
        setCurrentStage('success')
      }
    }
  }, [currentStage, codeReviewed, allTestsPassed, stepPassed])

  const handleSuccessClose = () => {
    onStepComplete(stepNumber)
    onClose()
  }

  const handleErrorClose = () => {
    setCurrentStage('completed')
    setErrorMessages([])
  }

  const handleErrorRetry = () => {
    handleRestartStep()
  }

  const headerStageText = currentStage === 'tests'
    ? `Test ${Math.min(currentTestIndex + 1, Math.max(tests.length, 1))}/${tests.length}`
    : currentStage === 'lesson' ? 'Kod yozish' : 'Natijalar'


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]">
      <style>{`
        @keyframes proXOptionIn { 0% { opacity: 0; transform: translateX(-28px); } 100% { opacity: 1; transform: translateX(0); } }
        .proX-option-anim { animation: proXOptionIn 520ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
      
      {currentStage === 'success' && <SuccessModal onClose={handleSuccessClose} stepNumber={stepNumber} />}
      {currentStage === 'error' && <ErrorModal errors={errorMessages} onRetry={handleErrorRetry} onClose={handleErrorClose} />}
      
      <div className="w-screen h-screen bg-slate-900 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-700 bg-slate-800/90 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                <span className="text-base font-bold text-white">{stepNumber}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">{step?.title || `${stepNumber}-qadam`}</h3>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-lg text-[11px] font-semibold border border-slate-600/40 bg-slate-900/30 text-slate-200">{headerStageText}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 truncate">{step?.category} • {step?.points} ball</p>
              </div>
            </div>
            {currentStage !== 'completed' && (
              <button onClick={onClose} className="w-10 h-10 bg-slate-700/40 hover:bg-slate-600/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 min-h-0 p-4 ${currentStage === 'completed' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
          <div className="h-full max-w-7xl mx-auto">
            {/* Loading Stage */}
            {currentStage === 'loading' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Qadam yuklanmoqda...</p>
                </div>
              </div>
            )}


            {/* Tests Stage */}
            {currentStage === 'tests' && tests.length > 0 && (
              <div className="h-full flex flex-col justify-center overflow-hidden max-w-2xl mx-auto">
                <div className="shrink-0">
                  <div className="w-full bg-gradient-to-b from-slate-800/35 to-slate-900/25 border border-slate-700/50 rounded-xl sm:rounded-2xl overflow-hidden">
                    <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-b border-slate-700/40 bg-slate-900/20">
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-[11px] text-slate-500">Savol</p>
                          <h5 className="mt-1 sm:mt-2 text-base sm:text-lg font-semibold text-white leading-snug">
                            {tests[currentTestIndex]?.question}
                          </h5>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 bg-yellow-500/15 text-yellow-300 border border-yellow-500/25 rounded-lg text-xs font-semibold">
                          {step?.points || 10} ball
                        </span>
                      </div>
                    </div>
                    <div className="px-3 sm:px-4 py-3 sm:py-4">
                      <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2 sm:mb-3">Variantlar</p>
                      <div className="flex flex-col gap-2 sm:gap-3">
                        {tests[currentTestIndex]?.options?.map((option, index) => {
                          const selected = testAnswers[currentTestIndex] === index
                          return (
                            <label key={`${optionsAnimKey}-${index}`} className={`proX-option-anim group flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl border cursor-pointer transition ${selected ? 'border-yellow-500/70 bg-yellow-500/10' : 'border-slate-600/40 bg-slate-700/10 hover:bg-slate-700/25'}`} style={{ animationDelay: `${index * 110}ms` }}>
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 flex items-center justify-center font-bold text-sm shrink-0 ${selected ? 'border-yellow-500 bg-yellow-500 text-white' : 'border-slate-500/70 text-slate-200'}`}>
                                {variants[index]}
                              </div>
                              <span className="text-sm sm:text-base text-slate-200 leading-snug">{option}</span>
                              <input type="radio" name={`test-${currentTestIndex}`} checked={selected} onChange={() => setTestAnswers(prev => ({ ...prev, [currentTestIndex]: index }))} className="sr-only" />
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <button onClick={handlePrevTest} disabled={submitting || currentTestIndex === 0} className="py-2.5 sm:py-3 bg-slate-800/50 text-slate-200 border border-slate-700/50 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-semibold">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Orqaga
                  </button>
                  <button onClick={handleNextTest} disabled={submitting || testAnswers[currentTestIndex] === undefined} className="py-2.5 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-bold">
                    {currentTestIndex < tests.length - 1 ? <>Keyingi <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></> : <>Davom <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></>}
                  </button>
                </div>
              </div>
            )}


            {/* Lesson Stage - Vazifa va Kod */}
            {currentStage === 'lesson' && (
              <div className="h-full flex flex-col gap-4 overflow-hidden">
                {submitting ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="text-xl font-bold text-white mb-2">AI tekshirmoqda...</h3>
                      <p className="text-slate-400">Kodingiz tahlil qilinmoqda, iltimos kuting</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Vazifa qismi */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <p className="text-xs lg:text-sm text-blue-400 font-medium">📋 Vazifa</p>
                            <div className="flex items-center gap-2">
                              {step?.codeTask?.hints && step.codeTask.hints.length > 0 && (
                                <button
                                  onClick={() => setShowHints(!showHints)}
                                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${showHints ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-slate-700/50 text-slate-400 hover:text-yellow-400'}`}
                                >
                                  <Lightbulb className="w-3.5 h-3.5" />
                                  Maslahatlar
                                </button>
                              )}
                              <button
                                onClick={() => setShowSolution(!showSolution)}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${showSolution ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-700/50 text-slate-400 hover:text-green-400'}`}
                              >
                                {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                Yechim
                              </button>
                            </div>
                          </div>
                          <p className="text-sm lg:text-base text-white">{step?.codeTask?.instruction || step?.title}</p>
                          
                          {/* Maslahatlar */}
                          {showHints && step?.codeTask?.hints && (
                            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                              <p className="text-xs text-yellow-400 font-medium mb-2">💡 Maslahatlar:</p>
                              <div className="flex flex-wrap gap-2">
                                {step.codeTask.hints.map((hint, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-mono">
                                    {hint}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Yechim */}
                          {showSolution && step?.codeTask?.solution && (
                            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                              <p className="text-xs text-green-400 font-medium mb-2">✅ To'g'ri yechim:</p>
                              <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap overflow-x-auto max-h-40 overflow-y-auto">
                                {step.codeTask.solution}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>


                    {/* Kod va Preview */}
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
                      {/* Kod yozish */}
                      <div className="min-h-0 flex flex-col bg-slate-800/30 border border-slate-700/40 rounded-2xl overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-slate-700/40 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Code className="w-4 h-4" /> 
                            <span>Kodingiz</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500">Bo'sh joylarni to'ldiring</span>
                          </div>
                        </div>
                        <textarea 
                          value={lessonContent} 
                          onChange={(e) => setLessonContent(e.target.value)} 
                          placeholder="Kodni shu yerga yozing..."
                          className="flex-1 min-h-0 bg-slate-900/50 p-4 text-slate-200 font-mono text-xs sm:text-sm resize-none focus:outline-none leading-relaxed" 
                          spellCheck={false}
                        />
                      </div>
                      
                      {/* Preview */}
                      <div className="min-h-0 flex flex-col bg-white rounded-2xl border border-slate-700/40 overflow-hidden">
                        <div className="px-4 py-2.5 bg-slate-950 text-xs text-slate-300 border-b border-slate-800 flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="ml-2">Preview</span>
                        </div>
                        <iframe 
                          srcDoc={lessonContent || '<p style="padding:16px;color:#64748b;font-family:sans-serif;">Kod yozing va natijani ko\'ring</p>'} 
                          className="w-full flex-1 min-h-0 border-0" 
                          title="Preview" 
                        />
                      </div>
                    </div>
                    
                    {/* Submit button */}
                    <button 
                      onClick={handleSubmitLesson} 
                      disabled={submitting || !lessonContent.trim()} 
                      className="py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      AI bilan tekshirish
                    </button>
                  </>
                )}
              </div>
            )}


            {/* Completed Stage */}
            {currentStage === 'completed' && (
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {/* Test natijalari */}
                  <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl sm:rounded-2xl flex flex-col">
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-700/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-white">Test natijalari</span>
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold ${allTestsPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {correctTests}/{totalTests}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 p-3 sm:p-4 overflow-y-auto max-h-64">
                      <div className="flex flex-col gap-2">
                        {tests.map((test, idx) => {
                          const result = testResults[idx]
                          return (
                            <div key={idx} className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border ${result?.isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                              <p className="text-[11px] sm:text-sm text-white font-medium mb-1">{idx + 1}. {test.question}</p>
                              <div className="text-[10px] sm:text-xs">
                                <p className="text-slate-400">
                                  Siz: <span className={result?.isCorrect ? 'text-green-400' : 'text-red-400'}>{variants[result?.selectedIndex ?? 0]}) {test.options[result?.selectedIndex ?? 0]}</span>
                                </p>
                                {!result?.isCorrect && (
                                  <p className="text-slate-400 mt-0.5">
                                    To'g'ri: <span className="text-green-400">{variants[result?.correctIndex ?? 0]}) {test.options[result?.correctIndex ?? 0]}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Kod tekshiruvi */}
                  <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl sm:rounded-2xl flex flex-col">
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-700/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-white">AI Kod tekshiruvi</span>
                        {codeReviewed && (
                          <span className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold ${allCodePassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {codeScore}/100
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 p-3 sm:p-4">
                      {!codeReviewed ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 text-blue-500 animate-spin mr-2" />
                          <p className="text-xs sm:text-sm text-slate-400">AI tekshirmoqda...</p>
                        </div>
                      ) : allCodePassed ? (
                        <div className="flex items-center gap-3 py-4">
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm sm:text-base font-semibold text-green-400">Kod to'g'ri! ✨</p>
                            <p className="text-[10px] sm:text-xs text-slate-400">Ball: {codeScore}/100</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {codeErrors.length > 0 && (
                            <div className="flex flex-col gap-1.5">
                              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Xatolar:</p>
                              {codeErrors.map((err: any, i: number) => (
                                <div key={i} className="p-1.5 sm:p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                                  <p className="text-[10px] sm:text-xs text-red-400">{err.message}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={stepPassed ? onClose : handleRestartStep}
                  className={`py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 ${stepPassed ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'}`}
                >
                  {stepPassed ? 'Yopish' : 'Qadamni qayta boshlash'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}