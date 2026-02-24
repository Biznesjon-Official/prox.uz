import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { Loader2, Code2, Sparkles, Home } from 'lucide-react'

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const from = (location.state as any)?.from?.pathname || '/'
  
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.username.trim()) { setError('Username kiriting'); return }
    if (!formData.password) { setError('Parol kiriting'); return }

    setLoading(true)
    setError('')

    try {
      const response = await authService.login(formData)
      if (response.success && response.token) {
        if ((response as any).paymentStatus) {
          localStorage.setItem('paymentStatus', JSON.stringify((response as any).paymentStatus))
        }
        const role = response.user?.role
        // Redirect to original page or default
        const redirectTo = role === 'student' ? (from !== '/login' ? from : '/tasks') : '/dashboard'
        window.location.href = redirectTo
      } else {
        setError('Login yoki parol noto\'g\'ri')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login yoki parol noto\'g\'ri')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating code symbols */}
        <div className="absolute top-20 left-[15%] text-white/5 text-6xl font-mono animate-float">&lt;/&gt;</div>
        <div className="absolute bottom-32 right-[20%] text-white/5 text-5xl font-mono animate-float" style={{ animationDelay: '2s' }}>{ }</div>
        <div className="absolute top-1/3 right-[10%] text-white/5 text-4xl font-mono animate-float" style={{ animationDelay: '1s' }}>#</div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
      
      {/* Home button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white text-sm font-medium transition-all backdrop-blur-sm group"
      >
        <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>Bosh sahifa</span>
      </button>

      {/* Main container */}
      <div className="relative w-full max-w-md z-10">

        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/20">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">proX Academy</h1>
            <p className="text-white/40 text-sm mt-1">Dasturlash platformasi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl transition-opacity ${focused === 'username' ? 'opacity-100' : 'opacity-0'}`} />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => { setFormData({ ...formData, username: e.target.value }); setError('') }}
                onFocus={() => setFocused('username')}
                onBlur={() => setFocused(null)}
                className="relative w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-transparent focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all peer"
                placeholder="Username"
                autoComplete="username"
              />
              <label className={`absolute left-4 transition-all pointer-events-none ${
                formData.username || focused === 'username' 
                  ? 'top-1.5 text-[10px] text-blue-400' 
                  : 'top-4 text-sm text-white/30'
              }`}>
                Username
              </label>
            </div>

            {/* Password */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl transition-opacity ${focused === 'password' ? 'opacity-100' : 'opacity-0'}`} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setError('') }}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                className="relative w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-transparent focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all peer"
                placeholder="Parol"
                autoComplete="current-password"
              />
              <label className={`absolute left-4 transition-all pointer-events-none ${
                formData.password || focused === 'password' 
                  ? 'top-1.5 text-[10px] text-purple-400' 
                  : 'top-4 text-sm text-white/30'
              }`}>
                Parol
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Kirish...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Kirish</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}