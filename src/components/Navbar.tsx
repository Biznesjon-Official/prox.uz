import { Menu } from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
  title: string
  subtitle?: string
}

export default function Navbar({ onMenuClick, title, subtitle }: NavbarProps) {
  return (
    <nav className="lg:hidden fixed top-0 left-0 right-0 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/prox.png" alt="proX" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  )
}
