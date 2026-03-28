'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Course = {
  id: string
  slug: string
  title: string
  description: string
  price: number
  duration: string
  imageUrl: string | null
  teacher: { name: string; specialization: string } | null
}

const filters = ['Все', 'КПТ', 'Психоанализ', 'Семейная терапия', 'Экзистенциальная']

function formatPrice(kopecks: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(kopecks / 100)
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] hover:border-[#C4A882] hover:shadow-md transition-all group">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#F5F0E8] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl text-[#E8DFD0] group-hover:scale-110 transition-transform">
            Ψ
          </span>
        </div>
        {course.teacher && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#3D1F0E] text-[#F5F0E8] text-xs border-0 rounded-full px-3">
              {course.teacher.specialization.split(' ')[0]}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-serif text-xl text-[#3D1F0E] leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-[#9B6B4E] leading-relaxed line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-xs text-[#9B6B4E]">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {course.duration}
            </span>
          </div>
          <span className="font-medium text-[#3D1F0E] text-sm">
            {formatPrice(course.price)}
          </span>
        </div>

        {course.teacher && (
          <p className="text-xs text-[#9B6B4E] border-t border-[#F5F0E8] pt-3">
            Преподаватель: {course.teacher.name}
          </p>
        )}

        <Button
          asChild
          variant="ghost"
          className="w-full justify-between text-[#3D1F0E] hover:bg-[#F5F0E8] border border-[#E8DFD0] mt-1 h-9"
        >
          <Link href={`/courses/${course.slug}`}>
            Подробнее <ArrowRight size={14} />
          </Link>
        </Button>
      </div>
    </article>
  )
}

interface CoursesSectionProps {
  courses: Course[]
  title?: string
  subtitle?: string
}

export function CoursesSection({ courses, title = 'Наши программы', subtitle }: CoursesSectionProps) {
  const [activeFilter, setActiveFilter] = useState('Все')

  const filtered = activeFilter === 'Все'
    ? courses
    : courses.filter(c =>
        c.teacher?.specialization.toLowerCase().includes(activeFilter.toLowerCase())
      )

  return (
    <section className="section-py bg-[#F5F0E8]">
      <div className="container-site">
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
            Образование
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D1F0E] text-balance mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#9B6B4E] max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-colors border',
                activeFilter === f
                  ? 'bg-[#3D1F0E] text-[#F5F0E8] border-[#3D1F0E]'
                  : 'bg-white text-[#9B6B4E] border-[#E8DFD0] hover:border-[#C4A882]'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#9B6B4E]">
            <p>Курсы по выбранному фильтру не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
