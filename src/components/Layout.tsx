import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import { Menu } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
  isLoggedIn: boolean
  userRole?: string | null
}

export default function Layout({ children, isLoggedIn, userRole = null }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  let currentUser: any = null
  try {
    const raw = localStorage.getItem('user')
    currentUser = raw ? JSON.parse(raw) : null
  } catch { currentUser = null }



  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Mobile Top Navigation - 65px height */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 h-[65px] bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 px-4 z-40 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <img 
              src="/prox.png" 
              alt="ProX Academy" 
              className="w-[92px] h-[92px] object-contain ml-[10px]"
            />
          </div>
          
          {/* Mobile Profile */}
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {(currentUser?.fullName || 'U')[0].toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar 
        isLoggedIn={isLoggedIn} 
        userRole={userRole}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="lg:ml-64 transition-all duration-300 pt-[65px] lg:pt-0 relative">
        {/* Desktop Header - 65px height to match sidebar */}
        <header className="hidden lg:flex items-center justify-end h-[65px] px-6 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30">
          
          {/* Desktop Profile */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {(currentUser?.fullName || 'U')[0].toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{currentUser?.fullName || 'Foydalanuvchi'}</p>
                <p className="text-[10px] text-slate-500">
                  {userRole === 'student' ? "O'quvchi" : 'Administrator'}
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
