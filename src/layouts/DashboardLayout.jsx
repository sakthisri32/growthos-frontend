import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import Sidebar from '../components/Sidebar.jsx'

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-ink-950 bg-dot-grid">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 h-full">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 md:hidden">
          <span className="font-display text-sm font-semibold text-mist-100">GrowthOS</span>
          <button onClick={() => setMobileOpen(true)} className="text-mist-100">
            <HiOutlineMenu size={22} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
