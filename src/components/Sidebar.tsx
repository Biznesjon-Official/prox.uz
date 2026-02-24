import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Home, GraduationCap, Wallet, FolderOpen, User, LayoutDashboard, 
  FileText, X, Sparkles, Trophy, LogOut, LucideIcon
} from 'lucide-react'

interface MenuItem {
  path: string
  label: string
  icon: LucideIcon
  badge?: string
}

interface SidebarProps {
  isLoggedIn: boolean
  userRole?: string | null
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export default function Sidebar({ isLoggedIn, userRole = null, isMobileOpen = false, onMobileClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
  }

  const publicMenuItems: MenuItem[] = [
    { path: '/', label: 'Bosh sahifa', icon: Home },
    { path: '/students', label: "O'quvchilar", icon: GraduationCap },
    { path: '/debtors', label: "Qarzdorlar", icon: Wallet },
    { path: '/projects', label: 'Loyihalar', icon: FolderOpen },
    { path: '/login', label: 'Kirish', icon: User },
  ]

  const studentMenuItems: MenuItem[] = [
    { path: '/', label: 'Bosh sahifa', icon: Home },
    { path: '/tasks', label: 'Qadamlar', icon: FileText },
    { path: '/students', label: "O'quvchilar", icon: GraduationCap },
    { path: '/debtors', label: "Qarzdorlar", icon: Wallet },
    { path: '/projects', label: 'Loyihalar', icon: FolderOpen },
    { path: '/profile', label: 'Profilim', icon: User },
  ]

  const adminMenuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/students', label: "O'quvchilar", icon: GraduationCap },
    { path: '/debtors', label: "Qarzdorlar", icon: Wallet },
    { path: '/student-steps', label: "Qadamlar nazorati", icon: Trophy },
    { path: '/projects', label: 'Loyihalar', icon: FolderOpen },
    { path: '/tasks', label: 'Vazifalar', icon: FileText },
  ]

  const menuItems = isLoggedIn
    ? (userRole === 'student' ? studentMenuItems : adminMenuItems)
    : publicMenuItems

  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onMobileClose} 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 z-50
        bg-slate-900 border-r border-slate-800/50
        transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Header */}
        <div className="h-[65px] px-4 flex items-center justify-between border-b border-slate-800/50">
          <Link to="/" className="flex items-center gap-2.5">
            <img 
              src="/loyihalar/icon-GPZq16vU.png" 
              alt="proX Academy" 
              className="w-8 h-8 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-base font-bold text-white">proX Academy</h1>
              <p className="text-[10px] text-slate-500">O'quv platformasi</p>
            </div>
          </Link>
          <button 
            onClick={onMobileClose} 
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col h-[calc(100vh-65px)]">
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => { if (window.innerWidth < 1024 && onMobileClose) onMobileClose() }}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-500/10 text-white' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-blue-400' : ''}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Logout Button - Only when logged in */}
          {isLoggedIn && (
            <div className="p-3 border-t border-slate-800/50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/30"
              >
                <LogOut className="w-[18px] h-[18px]" />
                <span className="text-sm font-medium">Chiqish</span>
              </button>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}
