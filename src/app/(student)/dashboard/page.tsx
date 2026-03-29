import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Мои курсы — Личный кабинет' }

const statusConfig = {
  PENDING: { label: 'Ожидает подтверждения', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  ACTIVE: { label: 'Активен', className: 'bg-green-50 text-green-700 border-green-200' },
  COMPLETED: { label: 'Завершён', className: 'bg-gray-100 text-gray-600 border-gray-200' },
}

function formatPrice(kopecks: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(kopecks / 100)
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { course: { include: { teacher: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Мои курсы</h1>
        <p className="text-[#9B6B4E] mt-1">
          Добро пожаловать, {session.user.name ?? session.user.email}
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD0]">
          <span className="font-serif text-6xl text-[#E8DFD0]">Ψ</span>
          <h2 className="font-serif text-2xl text-[#3D1F0E] mt-4 mb-2">
            У вас пока нет записей
          </h2>
          <p className="text-[#9B6B4E] mb-6">
            Запишитесь на курс, чтобы начать обучение
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-[#3D1F0E] text-[#F5F0E8] px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#6B3A25] transition-colors"
          >
            Посмотреть курсы →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrollments.map(e => {
            const status = statusConfig[e.status]
            return (
              <article key={e.id} className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden hover:border-[#C4A882] transition-colors">
                {/* Image placeholder */}
                <div className="h-32 bg-[#F5F0E8] flex items-center justify-center">
                  <span className="font-serif text-5xl text-[#E8DFD0]">Ψ</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-serif text-xl text-[#3D1F0E] leading-snug">
                      {e.course.title}
                    </h2>
                    <span className={`shrink-0 text-xs px-2 py-1 rounded-full border ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#9B6B4E]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {e.course.duration}
                    </span>
                    {e.course.teacher && (
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {e.course.teacher.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#F5F0E8]">
                    <span className="text-sm font-medium text-[#3D1F0E]">
                      {formatPrice(e.course.price)}
                    </span>
                    <span className="text-xs text-[#9B6B4E]">
                      Записан {formatDate(e.createdAt)}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
