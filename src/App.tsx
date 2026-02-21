import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import StudentsPage from './pages/StudentsPage'
import StudentProfile from './pages/StudentProfile'
import DebtorsPage from './pages/DebtorsPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import TasksPage from './pages/TasksPage'
import StudentHomePage from './pages/StudentHomePage'
import StudentStepsPage from './pages/StudentStepsPage'
import AcademyPage from './pages/AcademyPage'

// Protected Route wrapper - login kerak bo'lgan sahifalar uchun
function ProtectedRoute({ children, isLoggedIn }: { children: React.ReactNode; isLoggedIn: boolean }) {
  const location = useLocation()
  
  if (!isLoggedIn) {
    // Login sahifasiga yo'naltirish, qaytish uchun joriy sahifani saqlash
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}

function App() {
  let initialUser: any = null
  try {
    const raw = localStorage.getItem('user')
    initialUser = raw ? JSON.parse(raw) : null
  } catch {
    initialUser = null
  }

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [userRole, setUserRole] = useState<string | null>(initialUser?.role || null)
  const [userId, setUserId] = useState<string | null>(initialUser?.id || null)
  const [, forceUpdate] = useState(0)

  const syncAuthState = () => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    try {
      const raw = localStorage.getItem('user')
      const parsed = raw ? JSON.parse(raw) : null
      setUserRole(parsed?.role || null)
      setUserId(parsed?.id || null)
    } catch {
      setUserRole(null)
      setUserId(null)
    }
  }

  useEffect(() => {
    syncAuthState()

    // Android back button + tab suspension fix
    // When browser restores from bfcache, force re-render
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        syncAuthState()
        forceUpdate(n => n + 1)
      }
    }

    // When tab becomes visible again after suspension
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncAuthState()
        forceUpdate(n => n + 1)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])


  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route 
          path="/login" 
          element={
            isLoggedIn
              ? <Navigate to={userRole === 'student' ? '/tasks' : '/dashboard'} replace />
              : <LoginPage />
          } 
        />
        
        {/* ===== PUBLIC ROUTES - Login kerak emas ===== */}
        
        {/* Bosh sahifa - StudentHomePage hamma uchun */}
        <Route path="/" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <StudentHomePage />
          </Layout>
        } />
        
        {/* Dashboard - public (lekin admin funksiyalari login kerak) */}
        <Route path="/dashboard" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <DashboardPage />
          </Layout>
        } />
        
        {/* Academy - public */}
        <Route path="/academy" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <AcademyPage />
          </Layout>
        } />
        
        {/* Students - public */}
        <Route path="/students" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <StudentsPage />
          </Layout>
        } />
        
        {/* Debtors - public */}
        <Route path="/debtors" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <DebtorsPage />
          </Layout>
        } />
        
        {/* Projects - public */}
        <Route path="/projects" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <ProjectsPage />
          </Layout>
        } />
        
        {/* Project detail - public */}
        <Route path="/project/:id" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <ProjectDetailPage />
          </Layout>
        } />
        
        {/* ===== PROTECTED ROUTES - Login kerak ===== */}
        
        {/* Tasks - protected */}
        <Route path="/tasks" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout isLoggedIn={true} userRole={userRole || undefined}>
              <TasksPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Profile redirect - protected */}
        <Route path="/profile" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {userId ? <Navigate to={`/student/${userId}`} replace /> : <Navigate to="/tasks" replace />}
          </ProtectedRoute>
        } />
        
        {/* Student profile - protected (o'z profilini ko'rish uchun) */}
        <Route path="/student/:id" element={
          <Layout isLoggedIn={isLoggedIn} userRole={userRole || undefined}>
            <StudentProfile />
          </Layout>
        } />
        
        {/* Student steps - admin only, protected */}
        <Route path="/student-steps" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {userRole === 'student' 
              ? <Navigate to="/tasks" replace />
              : <Layout isLoggedIn={true} userRole={userRole || undefined}><StudentStepsPage /></Layout>
            }
          </ProtectedRoute>
        } />
        
        {/* Catch all - redirect based on login status */}
        <Route path="*" element={
          isLoggedIn 
            ? <Navigate to={userRole === 'student' ? '/tasks' : '/dashboard'} replace />
            : <Navigate to="/" replace />
        } />
      </Routes>
    </Router>
  )
}

export default App