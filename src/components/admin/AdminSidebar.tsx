'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  MessageSquare,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Дашборд', href: '/admin', icon: LayoutDashboard },
  { label: 'Курсы', href: '/admin/courses', icon: BookOpen },
  { label: 'Преподаватели', href: '/admin/teachers', icon: Users },
  { label: 'Блог', href: '/admin/blog', icon: FileText },
  { label: 'Записи', href: '/admin/enrollments', icon: ClipboardList },
  { label: 'Обращения', href: '/admin/contacts', icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#3D1F0E] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#6B3A25]">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-2xl text-[#F5F0E8]">Ψ</span>
          <div className="text-xs text-[#C4A882] leading-tight">
            Школа<br />психологии
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-[#6B3A25] text-[#F5F0E8]'
                  : 'text-[#C4A882] hover:bg-[#6B3A25] hover:bg-opacity-50 hover:text-[#F5F0E8]'
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#6B3A25]">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#C4A882] hover:bg-[#6B3A25] hover:bg-opacity-50 hover:text-[#F5F0E8] transition-colors mb-1"
        >
          ← На сайт
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#C4A882] hover:bg-[#6B3A25] hover:bg-opacity-50 hover:text-[#F5F0E8] transition-colors w-full text-left"
        >
          <LogOut size={16} />
          Выйти
        </button>
      </div>
    </aside>
  )
}
