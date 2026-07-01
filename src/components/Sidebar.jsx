import { NavLink } from 'react-router-dom'
import {
  HiOutlineHome, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineAcademicCap,
  HiOutlineFire, HiOutlineFlag, HiOutlineFolder, HiOutlineBookOpen,
  HiOutlineSparkles, HiOutlineBeaker, HiOutlineLightBulb, HiOutlineLibrary,
  HiOutlineBadgeCheck, HiOutlineCog, HiOutlineLogout, HiOutlineChartBar
} from 'react-icons/hi'
import { useAuth } from '../context/AuthContext.jsx'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { to: '/dashboard/timetable', label: 'Timetable', icon: HiOutlineCalendar },
  { to: '/dashboard/tasks', label: 'Tasks', icon: HiOutlineCheckCircle },
  { to: '/dashboard/skills', label: 'Skills', icon: HiOutlineAcademicCap },
  { to: '/dashboard/habits', label: 'Habits', icon: HiOutlineFire },
  { to: '/dashboard/goals', label: 'Goals', icon: HiOutlineFlag },
  { to: '/dashboard/projects', label: 'Projects', icon: HiOutlineFolder },
  { to: '/dashboard/journal', label: 'Journal', icon: HiOutlineBookOpen },
  
  { to: '/dashboard/research', label: 'Research', icon: HiOutlineBeaker },
  { to: '/dashboard/startup-ideas', label: 'Startup Ideas', icon: HiOutlineLightBulb },
  { to: '/dashboard/reading-list', label: 'Reading List', icon: HiOutlineLibrary },
  { to: '/dashboard/achievements', label: 'Achievements', icon: HiOutlineBadgeCheck },
  { to: '/dashboard/analytics', label: 'Analytics', icon: HiOutlineChartBar }
]

export default function Sidebar({ onNavigate }) {
  const { user, logout } = useAuth()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/[0.06] bg-ink-950/60 px-3 py-5">
      <div className="flex items-center gap-2 px-3 font-display text-base font-semibold text-mist-100">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet-400 to-skyline text-sm font-bold text-ink-950">
          G
        </span>
        GrowthOS
      </div>

      <nav className="mt-6 flex-1 space-y-0.5 overflow-y-auto">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-violet-500/15 text-mist-100' : 'text-mist-500 hover:bg-white/[0.04] hover:text-mist-100'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-white/[0.06] pt-3">
        <NavLink
          to="/dashboard/settings"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              isActive ? 'bg-violet-500/15 text-mist-100' : 'text-mist-500 hover:bg-white/[0.04] hover:text-mist-100'
            }`
          }
        >
          <HiOutlineCog size={18} />
          Settings
        </NavLink>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-mist-500 transition-colors hover:bg-white/[0.04] hover:text-mist-100"
        >
          <HiOutlineLogout size={18} />
          Logout
        </button>

        <div className="mt-2 flex items-center gap-2 px-3 pt-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-mist-100">{user?.name}</p>
            <p className="truncate text-[11px] text-mist-700">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
