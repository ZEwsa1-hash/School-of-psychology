export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Users, ClipboardList, MessageSquare } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Дашборд — Администратор' }

export default async function AdminDashboard() {
  const [coursesCount, studentsCount, enrollmentsCount, newContactsCount, recentContacts, recentEnrollments] =
    await Promise.all([
      prisma.course.count({ where: { published: true } }),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.enrollment.count(),
      prisma.contactRequest.count({ where: { status: 'NEW' } }),
      prisma.contactRequest.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      prisma.enrollment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true, course: true },
      }),
    ])

  const stats = [
    { label: 'Опубликованных курсов', value: coursesCount, icon: BookOpen, href: '/admin/courses' },
    { label: 'Студентов', value: studentsCount, icon: Users, href: '/admin/enrollments' },
    { label: 'Записей на курсы', value: enrollmentsCount, icon: ClipboardList, href: '/admin/enrollments' },
    { label: 'Новых обращений', value: newContactsCount, icon: MessageSquare, href: '/admin/contacts', highlight: true },
  ]

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-[#3D1F0E]">Дашборд</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl p-6 border border-[#E8DFD0] hover:border-[#C4A882] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#9B6B4E]">{stat.label}</p>
                  <p className={`font-serif text-4xl mt-1 ${stat.highlight && stat.value > 0 ? 'text-[#6B3A25]' : 'text-[#3D1F0E]'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#F5F0E8] flex items-center justify-center">
                  <Icon size={18} className="text-[#6B3A25]" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent contacts */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD0]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-[#3D1F0E]">Последние обращения</h2>
            <Link href="/admin/contacts" className="text-sm text-[#6B3A25] hover:underline">
              Все →
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-[#9B6B4E] py-4 text-center">Нет обращений</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map(c => (
                <div key={c.id} className="flex items-start justify-between gap-4 pb-3 border-b border-[#F5F0E8] last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#3D1F0E] truncate">{c.name}</p>
                    <p className="text-xs text-[#9B6B4E]">{c.phone}</p>
                    <p className="text-xs text-[#9B6B4E] truncate">{c.message.substring(0, 50)}...</p>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-1 rounded-full ${c.status === 'NEW' ? 'bg-[#F5F0E8] text-[#6B3A25]' : 'bg-gray-100 text-gray-500'}`}>
                    {c.status === 'NEW' ? 'Новое' : 'Обработано'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent enrollments */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD0]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-[#3D1F0E]">Последние записи</h2>
            <Link href="/admin/enrollments" className="text-sm text-[#6B3A25] hover:underline">
              Все →
            </Link>
          </div>
          {recentEnrollments.length === 0 ? (
            <p className="text-sm text-[#9B6B4E] py-4 text-center">Нет записей</p>
          ) : (
            <div className="space-y-3">
              {recentEnrollments.map(e => (
                <div key={e.id} className="flex items-start justify-between gap-4 pb-3 border-b border-[#F5F0E8] last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#3D1F0E] truncate">{e.user.email}</p>
                    <p className="text-xs text-[#9B6B4E] truncate">{e.course.title}</p>
                    <p className="text-xs text-[#9B6B4E]">{formatDate(e.createdAt)}</p>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-[#F5F0E8] text-[#6B3A25]">
                    {e.status === 'PENDING' ? 'Ожидает' : e.status === 'ACTIVE' ? 'Активен' : 'Завершён'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
