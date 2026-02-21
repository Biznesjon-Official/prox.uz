import {
  AlertCircle, ArrowLeft, ArrowRight, Award, BarChart3, Book, Bot, Calendar,
  Check, CheckCircle, ChevronDown, Clock, Code, CreditCard, FileText, Globe,
  Grid3X3, GraduationCap, Home, Info, LayoutDashboard, List, Loader2, Lock,
  LogIn, LogOut, Menu, MessageCircle, Play, Plus, RefreshCw, Rocket, Search,
  Settings, Star, TrendingUp, Trophy, Upload, User, Users, X, Zap
} from 'lucide-react'

// Icon mapping - material-symbols to lucide-react
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Navigation & Actions
  'arrow_back': ArrowLeft,
  'arrow_forward': ArrowRight,
  'menu': Menu,
  'close': X,
  'search': Search,
  'refresh': RefreshCw,
  'add': Plus,
  'settings': Settings,
  'logout': LogOut,
  'login': LogIn,
  
  // Status & Feedback
  'error': AlertCircle,
  'info': Info,
  'check': Check,
  'check_circle': CheckCircle,
  'lock': Lock,
  'progress_activity': Loader2,
  
  // Content & Data
  'assignment': FileText,
  'book': Book,
  'code': Code,
  'quiz': FileText,
  'star': Star,
  'trophy': Trophy,
  'bolt': Zap,
  'trending_up': TrendingUp,
  
  // Views
  'grid_view': Grid3X3,
  'view_list': List,
  'dashboard': LayoutDashboard,
  'home': Home,
  
  // People & Groups
  'person': User,
  'group': Users,
  'school': GraduationCap,
  
  // Time & Schedule
  'schedule': Clock,
  'calendar_today': Calendar,
  
  // Actions
  'play_arrow': Play,
  'upload': Upload,
  
  // Business
  'payments': CreditCard,
  'bar_chart': BarChart3,
  'leaderboard': Trophy,
  
  // Communication
  'chat': MessageCircle,
  'forum': MessageCircle,
  
  // Misc
  'rocket': Rocket,
  'globe': Globe,
  'bot': Bot,
  'file': FileText,
  'award': Award,
}

interface IconProps {
  name: string
  className?: string
}

export function Icon({ name, className = '' }: IconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`)
    return <span className={className}>?</span>
  }
  
  return <IconComponent className={className} />
}

// Re-export all icons for direct use
export {
  AlertCircle, ArrowLeft, ArrowRight, Award, BarChart3, Book, Bot, Calendar,
  Check, CheckCircle, ChevronDown, Clock, Code, CreditCard, FileText, Globe,
  Grid3X3, GraduationCap, Home, Info, LayoutDashboard, List, Loader2, Lock,
  LogIn, LogOut, Menu, MessageCircle, Play, Plus, RefreshCw, Rocket, Search,
  Settings, Star, TrendingUp, Trophy, Upload, User, Users, X, Zap
}
