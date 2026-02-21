import { useNavigate } from 'react-router-dom'
import { FileText, User, BadgeCheck, TrendingUp, Users, Brain, Sparkles, Target, Rocket, Globe, ArrowRight } from 'lucide-react'

export default function StudentHomePage() {
  const navigate = useNavigate()

  const techStack = [
    { name: 'React', logo: '/texnologiya/reactjs-icon.svg' },
    { name: 'Next.js', logo: '/texnologiya/nextjs-icon.svg' },
    { name: 'Node.js', logo: '/texnologiya/nodejs-icon.svg' },
    { name: 'TypeScript', logo: '/texnologiya/Typescript_logo_2020.svg' },
    { name: 'JavaScript', logo: '/texnologiya/javascript-icon.svg' },
    { name: 'MongoDB', logo: '/texnologiya/mongodb-icon.svg' },
    { name: 'PostgreSQL', logo: '/texnologiya/postgresql-icon.svg' },
    { name: 'Python', logo: '/texnologiya/python-icon.svg' },
  ]

  const features = [
    { icon: Brain, title: 'AI Asosida Ta\'lim', desc: 'Sun\'iy intellektga asoslangan ta\'lim metodlari', color: 'blue' },
    { icon: Rocket, title: 'Zamonaviy Texnologiyalar', desc: 'Eng so\'nggi texnologiyalar va real loyihalar', color: 'green' },
    { icon: Users, title: 'Professional Muhit', desc: 'Jamoa bo\'lib ishlash ko\'nikmalari', color: 'purple' },
    { icon: Target, title: '100% Kafolat', desc: 'Daromadga chiqishni kafolatlaymiz', color: 'cyan' },
    { icon: Globe, title: 'Global Imkoniyatlar', desc: '40 ta davlatda amaliyot va ish', color: 'orange' },
    { icon: Sparkles, title: 'Eng Oxirgi Metod', desc: 'Zamonaviy metodlar bilan professional muhit', color: 'pink' },
  ]

  return (
    <div className="space-y-6 pb-6">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900/40 to-slate-900 rounded-2xl border border-slate-700/50 p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-cyan-300">O'quv platformasi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            proX - <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">dasturlash akademiyasi</span>
          </h1>

          <p className="text-white/80 mb-1">O'qishni davom ettiring va vazifalaringizni topshiring.</p>
          <p className="text-sm text-white/60 mb-6">Bugun yangi bilimlar, yangi qadamlar va yangi natijalar kuni!</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={() => navigate('/tasks')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <FileText className="w-4 h-4" />
              Qadam topshirish
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-5 py-2.5 bg-slate-800/50 border border-slate-600/50 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-slate-700/50 transition"
            >
              <User className="w-4 h-4" />
              Profilim
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-green-400" />
              <span>AI tekshiruv</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span>Kunlik progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Mentorlar nazorati</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Carousel - Infinite Loop */}
      <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 py-4">
        <div className="flex animate-scroll-infinite">
          {[...techStack, ...techStack, ...techStack].map((tech, idx) => (
            <div key={idx} className="flex-shrink-0 w-14 h-14 mx-2 bg-slate-700/50 border border-slate-600/50 rounded-xl flex items-center justify-center">
              <img src={tech.logo} alt={tech.name} className="w-8 h-8 object-contain" />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-scroll-infinite {
            animation: scroll-infinite 20s linear infinite;
          }
        `}</style>
      </div>

      {/* Features */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white mb-1">Nima uchun <span className="text-cyan-400">proX?</span></h2>
        <p className="text-sm text-slate-400">Eng zamonaviy metodlar bilan professional dasturchi bo'ling</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((f, idx) => (
          <div key={idx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className={`w-10 h-10 bg-${f.color}-500/20 rounded-xl flex items-center justify-center mb-3`}>
              <f.icon className={`w-5 h-5 text-${f.color}-400`} />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
            <p className="text-xs text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-slate-700/50 text-center">
        <h2 className="text-lg font-bold text-white mb-2">Bugun qadam topshirasizmi?</h2>
        <p className="text-sm text-white/70 mb-4">Vazifalarni bajarib, ball to'plang</p>
        <button
          onClick={() => navigate('/tasks')}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl inline-flex items-center gap-2 hover:opacity-90 transition"
        >
          <ArrowRight className="w-4 h-4" />
          Qadam topshirish
        </button>
      </div>
    </div>
  )
}
