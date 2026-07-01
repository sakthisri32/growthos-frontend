import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Landing page sections
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LogStrip from './components/LogStrip.jsx'
import Features from './components/Features.jsx'
import Testimonials from './components/Testimonials.jsx'
import Pricing from './components/Pricing.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

// Auth pages
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

// Dashboard
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Tasks from './pages/Tasks.jsx'
import Timetable from './pages/Timetable.jsx'
import Skills from './pages/Skills.jsx'
import Habits from './pages/Habits.jsx'
import Goals from './pages/Goals.jsx'
import Journal from './pages/Journal.jsx'
import Projects from './pages/Projects.jsx'
import Research from './pages/Research.jsx'
import StartupIdeas from './pages/StartupIdeas.jsx'
import ReadingList from './pages/ReadingList.jsx'
import Achievements from './pages/Achievements.jsx'

import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogStrip />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="skills" element={<Skills />} />
            <Route path="habits" element={<Habits />} />
            <Route path="goals" element={<Goals />} />
            <Route path="journal" element={<Journal />} />
            <Route path="projects" element={<Projects />} />
            <Route path="research" element={<Research />} />
            <Route path="startup-ideas" element={<StartupIdeas />} />
            <Route path="reading-list" element={<ReadingList />} />
            <Route path="achievements" element={<Achievements />} />
            
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
