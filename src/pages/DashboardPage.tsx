import { 
  GraduationCap, CheckSquare, Folder, Wallet, UserPlus, 
  CreditCard, FileText, ArrowUpRight, ArrowDownRight,
  Clock, Target, Zap, BarChart3
} from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { 
      label: "Jami o'quvchilar", 
      value: '150', 
      change: '+12', 
      trend: 'up',
      icon: GraduationCap, 
      color: 'blue',
      subtitle: 'bu oyda'
    },
    { 
      label: 'Tugallangan vazifalar', 
      value: '89', 
      change: '+23', 
      trend: 'up',
      icon: CheckSquare, 
      color: 'emerald',
      subtitle: 'bu hafta'
    },
    { 
      label: 'Faol loyihalar', 
      value: '25', 
      change: '+5', 
      trend: 'up',
      icon: Folder, 
      color: 'purple',
      subtitle: 'yangi'
    },
    { 
      label: "Qarzdor o'quvchilar", 
      value: '4', 
      change: '+1', 
      trend: 'down',
      icon: Wallet, 
      color: 'amber',
      subtitle: 'bu hafta'
    },
  ]

  const activities = [
    { 
      title: 'Alisher Karimov "React loyihasi"ni topshirdi', 
      time: '15 daqiqa oldin',
      icon: CheckSquare,
      color: 'emerald'
    },
    { 
      title: "Yangi o'quvchi ro'yxatdan o'tdi - Malika Tosheva", 
      time: '1 soat oldin',
      icon: UserPlus,
      color: 'blue'
    },
    { 
      title: 'Yangi loyiha yaratildi - "Mobile Banking App"', 
      time: '3 soat oldin',
      icon: Folder,
      color: 'purple'
    },
    { 
      title: "Bobur Rahimov to'lov qildi - 500,000 so'm", 
      time: '5 soat oldin',
      icon: CreditCard,
      color: 'amber'
    },
  ]

  const quickActions = [
    { label: "Yangi o'quvchi", desc: "O'quvchi qo'shish", icon: UserPlus, color: 'blue' },
    { label: 'Yangi vazifa', desc: 'Vazifa yaratish', icon: FileText, color: 'emerald' },
    { label: 'Yangi loyiha', desc: 'Loyiha yaratish', icon: Folder, color: 'purple' },
    { label: 'Hisobot', desc: 'Hisobot yaratish', icon: BarChart3, color: 'amber' },
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
      amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 sm:p-8">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium text-white/80">Bugungi holat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Xush kelibsiz, Admin!</h1>
            <p className="text-white/70">Platformangizda faol ish olib borilmoqda</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-white/60">Bugungi sana</p>
              <p className="text-lg font-semibold text-white">{new Date().toLocaleDateString('uz-UZ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const colors = getColorClasses(stat.color)
          const Icon = stat.icon
          return (
            <div 
              key={idx} 
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-800/50 hover:border-slate-700/50 transition group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-slate-500">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Activities */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50">
          <div className="p-4 sm:p-5 border-b border-slate-800/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">So'nggi faoliyatlar</h2>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">Barchasini ko'rish</button>
            </div>
          </div>
          <div className="p-4 sm:p-5 space-y-3">
            {activities.map((activity, idx) => {
              const colors = getColorClasses(activity.color)
              const Icon = activity.icon
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition group"
                >
                  <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{activity.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50">
          <div className="p-4 sm:p-5 border-b border-slate-800/50">
            <h2 className="text-lg font-bold text-white">Tezkor amallar</h2>
          </div>
          <div className="p-4 sm:p-5 space-y-2">
            {quickActions.map((action, idx) => {
              const colors = getColorClasses(action.color)
              const Icon = action.icon
              return (
                <button 
                  key={idx} 
                  className={`w-full p-3 ${colors.bg} border ${colors.border} rounded-xl hover:scale-[1.02] transition-all text-left group`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                    <div>
                      <p className="font-semibold text-white text-sm">{action.label}</p>
                      <p className="text-xs text-slate-500">{action.desc}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Umumiy ko'rsatkichlar</h2>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Haftalik maqsad</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "O'quvchilar faolligi", value: 87, color: 'blue' },
            { label: 'Vazifalar bajarilishi', value: 92, color: 'emerald' },
            { label: 'Loyihalar holati', value: 78, color: 'purple' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-800" />
                  <circle 
                    cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                    strokeDasharray={`${item.value * 2.51} 251`}
                    className={item.color === 'blue' ? 'text-blue-500' : item.color === 'emerald' ? 'text-emerald-500' : 'text-purple-500'}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{item.value}%</span>
                </div>
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{item.label}</h3>
              <p className="text-xs text-slate-500">Haftalik o'rtacha</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
