import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, TrendingUp, Users, GraduationCap, FolderOpen, Brain, Sparkles, Target, Rocket, Globe, ArrowRight } from 'lucide-react'

export default function AcademyPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresHeaderRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const techStack = [
    { name: 'React', logo: '/texnologiya/reactjs-icon.svg', glow: 'rgba(97, 218, 251, 0.35)' },
    { name: 'Next.js', logo: '/texnologiya/nextjs-icon.svg', glow: 'rgba(226, 232, 240, 0.18)' },
    { name: 'Node.js', logo: '/texnologiya/nodejs-icon.svg', glow: 'rgba(104, 160, 99, 0.30)' },
    { name: 'TypeScript', logo: '/texnologiya/Typescript_logo_2020.svg', glow: 'rgba(49, 120, 198, 0.30)' },
    { name: 'JavaScript', logo: '/texnologiya/javascript-icon.svg', glow: 'rgba(247, 223, 30, 0.25)' },
    { name: 'MongoDB', logo: '/texnologiya/mongodb-icon.svg', glow: 'rgba(77, 179, 61, 0.25)' },
    { name: 'PostgreSQL', logo: '/texnologiya/postgresql-icon.svg', glow: 'rgba(51, 103, 145, 0.30)' },
    { name: 'Express.js', logo: '/texnologiya/expressjs-icon.svg', glow: 'rgba(148, 163, 184, 0.18)' },
    { name: 'Python', logo: '/texnologiya/python-icon.svg', glow: 'rgba(55, 118, 171, 0.28)' },
    { name: 'HTML5', logo: '/texnologiya/HTML5_Badge.svg', glow: 'rgba(227, 79, 38, 0.28)' },
    { name: 'Electron', logo: '/texnologiya/electronjs-icon.svg', glow: 'rgba(47, 75, 89, 0.25)' },
  ]

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-animate-id')
        if (!id) return
        setIsVisible((prev) => ({ ...prev, [id]: entry.isIntersecting }))
      })
    }, observerOptions)

    const elements = [
      heroRef.current,
      statsRef.current,
      featuresHeaderRef.current,
      featuresRef.current,
      ctaRef.current
    ].filter(Boolean) as Element[]

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="space-y-8 sm:space-y-12 pb-8 sm:pb-12">
      {/* Hero Section - Zamonaviy va Professional */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>

        <div className="absolute right-6 bottom-6 lg:right-10 lg:bottom-10 hidden md:block pointer-events-none">
          <div className="hero-code-float relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/35 via-blue-500/25 to-purple-500/25 shadow-[0_24px_80px_-44px_rgba(56,189,248,0.55)]">
            <div className="relative rounded-2xl bg-slate-950/55 backdrop-blur-xl border border-slate-700/40 overflow-hidden">
              <div className="absolute inset-0 opacity-70 pointer-events-none bg-[radial-gradient(800px_circle_at_20%_0%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(700px_circle_at_90%_10%,rgba(168,85,247,0.12),transparent_55%)]"></div>
              <div className="relative px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">academy.tsx</span>
                </div>
                <div className="font-mono text-xs leading-5">
                  <div className="text-slate-500">1</div>
                  <div className="-mt-5 ml-5">
                    <span className="text-cyan-300">const</span>{' '}
                    <span className="text-blue-300">academy</span>{' '}
                    <span className="text-slate-200">=</span>{' '}
                    <span className="text-emerald-300">"open"</span>
                    <span className="text-slate-500">;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
          <div 
            ref={heroRef}
            data-animate-id="hero"
            className={`max-w-5xl mx-auto transition-all duration-1000 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-cyan-300">O'quv platformasi</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
              proX -{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                dasturlash akademiyasi
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 mb-3 sm:mb-4 max-w-3xl leading-relaxed">
              O'qishni davom ettiring va vazifalaringizni topshiring.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-6 sm:mb-10 max-w-3xl leading-relaxed">
              Bugun yangi bilimlar, yangi qadamlar va yangi natijalar kuni!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <button
                onClick={() => navigate('/students')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>O'quvchilar</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
              <button
                onClick={() => navigate('/projects')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-semibold text-sm sm:text-base rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Loyihalar</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="no-scrollbar flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60 overflow-x-auto flex-nowrap -mx-1 px-1">
              <div className="flex items-center gap-2 shrink-0">
                <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="whitespace-nowrap">AI tekshiruv</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="whitespace-nowrap">Kunlik progress</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="whitespace-nowrap">Mentorlar nazorati</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Zamonaviy Cards */}
      <div 
        ref={statsRef}
        data-animate-id="stats"
        className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6"
      >
        <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-blue-500/35 transition-all duration-500 shadow-lg shadow-blue-500/15 overflow-hidden ${
          isVisible.stats ? 'animate-fade-in-up delay-100' : 'opacity-0 translate-y-5'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/15 opacity-100"></div>
          <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500/25 to-blue-600/20 rounded-lg sm:rounded-xl flex items-center justify-center scale-110 transition-transform duration-300 shadow-md shadow-blue-500/10">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-lg sm:text-xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">50+</p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 leading-tight">O'quvchilar</p>
            </div>
          </div>
        </div>

        <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-green-500/30 transition-all duration-500 shadow-lg shadow-green-500/15 overflow-hidden ${
          isVisible.stats ? 'animate-fade-in-up delay-200' : 'opacity-0 translate-y-5'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/15 opacity-100"></div>
          <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500/25 to-green-600/20 rounded-lg sm:rounded-xl flex items-center justify-center scale-110 transition-transform duration-300 shadow-md shadow-green-500/10">
              <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-400" />
            </div>
            <div>
              <p className="text-lg sm:text-xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">15+</p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 leading-tight">Loyihalar</p>
            </div>
          </div>
        </div>

        <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-orange-500/30 transition-all duration-500 shadow-lg shadow-orange-500/15 overflow-hidden ${
          isVisible.stats ? 'animate-fade-in-up delay-300' : 'opacity-0 translate-y-5'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/15 opacity-100"></div>
          <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500/25 to-orange-600/20 rounded-lg sm:rounded-xl flex items-center justify-center scale-110 transition-transform duration-300 shadow-md shadow-orange-500/10">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-400" />
            </div>
            <div>
              <p className="text-lg sm:text-xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">100%</p>
              <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 leading-tight">Progressiya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Carousel */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/50 bg-gradient-to-r from-slate-800/50 via-slate-900/50 to-slate-800/50 backdrop-blur-sm py-5 sm:py-7 lg:py-9">
        <div className="flex animate-scroll">
          {/* First set */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {techStack.map((tech, idx) => (
              <div
                key={`tech-1-${idx}`}
                className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600/60 rounded-2xl backdrop-blur-sm flex items-center justify-center pointer-events-none"
                title={tech.name}
                style={{ 
                  boxShadow: `0 8px 32px -8px ${tech.glow}, 0 4px 16px -4px rgba(0,0,0,0.4)`,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-full h-full object-contain p-2 sm:p-3"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8" aria-hidden="true">
            {techStack.map((tech, idx) => (
              <div
                key={`tech-2-${idx}`}
                className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600/60 rounded-2xl backdrop-blur-sm flex items-center justify-center pointer-events-none"
                title={tech.name}
                style={{ 
                  boxShadow: `0 8px 32px -8px ${tech.glow}, 0 4px 16px -4px rgba(0,0,0,0.4)`,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-full h-full object-contain p-2 sm:p-3"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Zamonaviy Dizayn */}
      <div>
        <div 
          ref={featuresHeaderRef}
          data-animate-id="features-header"
          className={`text-center mb-6 sm:mb-10 transition-all duration-1000 delay-200 ${
            isVisible['features-header'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
            Nima uchun <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">proX?</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto px-4">
            Eng zamonaviy metodlar va texnologiyalar bilan professional dasturchi bo'ling
          </p>
        </div>

        <div 
          ref={featuresRef}
          data-animate-id="features"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* Feature 1 */}
          <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-blue-500/30 transition-all duration-500 shadow-xl shadow-blue-500/10 overflow-hidden ${
            isVisible.features ? 'animate-fade-in-up delay-100' : 'opacity-0 translate-y-5'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/25 to-blue-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 scale-110 transition-transform duration-300 shadow-md shadow-blue-500/10">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">AI Asosida Ta'lim</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Sun'iy intellektga asoslangan shaxsiylashtirilgan ta'lim metodlari.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-500/25 transition-all duration-500 shadow-xl shadow-green-500/10 overflow-hidden ${
            isVisible.features ? 'animate-fade-in-up delay-200' : 'opacity-0 translate-y-5'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500/25 to-green-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 scale-110 transition-transform duration-300 shadow-md shadow-green-500/10">
                <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Zamonaviy Texnologiyalar</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Eng so'nggi texnologiyalar va real loyihalar orqali professional bo'ling.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-500/25 transition-all duration-500 shadow-xl shadow-purple-500/10 overflow-hidden ${
            isVisible.features ? 'animate-fade-in-up delay-300' : 'opacity-0 translate-y-5'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/25 to-purple-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 scale-110 transition-transform duration-300 shadow-md shadow-purple-500/10">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Professional Muhit</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Haqiqiy professional muhit va jamoa bo'lib ishlash ko'nikmalari.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-cyan-500/25 transition-all duration-500 shadow-xl shadow-cyan-500/10 overflow-hidden ${
            isVisible.features ? 'animate-fade-in-up delay-400' : 'opacity-0 translate-y-5'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500/25 to-cyan-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 scale-110 transition-transform duration-300 shadow-md shadow-cyan-500/10">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">100% Kafolat</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Daromadga chiqishni 100% kafolatlaymiz. Sizning muvaffaqiyatingiz biznikidir.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-orange-500/25 transition-all duration-500 shadow-xl shadow-orange-500/10 overflow-hidden ${
            isVisible.features ? 'animate-fade-in-up delay-500' : 'opacity-0 translate-y-5'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500/25 to-orange-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 scale-110 transition-transform duration-300 shadow-md shadow-orange-500/10">
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Global Imkoniyatlar</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                40 ta davlatda amaliyot va ish offislari. Global imkoniyatlar sizni kutmoqda.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className={`group relative bg-gradient-to-br from-slate-800/85 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-pink-500/25 transition-all duration-500 shadow-xl shadow-pink-500/10 overflow-hidden ${
            isVisible.features ? 'animate-fade-in-up delay-600' : 'opacity-0 translate-y-5'
          }`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500/25 to-pink-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 scale-110 transition-transform duration-300 shadow-md shadow-pink-500/10">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Eng Oxirgi Metod</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Eng zamonaviy metodlar bilan offline akademiyalarda professional muhit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        data-animate-id="cta"
        className={`relative bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-700/50 overflow-hidden transition-all duration-1000 ${
          isVisible.cta 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
            Ro'yxatdan o'tishni xohlaysizmi?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 px-4">
            To'liq imkoniyatlardan foydalanish uchun ro'yxatdan o'ting
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Ro'yxatdan o'tish</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .hero-code-float {
          animation: heroFloat 7s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
      `}</style>
    </div>
  )
}