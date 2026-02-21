import { Link, useLocation } from 'react-router-dom'
import { 
  Home, GraduationCap, Wallet, FolderOpen, User, LayoutDashboard, 
  FileText, X, Sparkles, Trophy, LucideIcon
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
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
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
        <nav className="p-3 overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
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
        </nav>
      </aside>
    </>
  )
}
