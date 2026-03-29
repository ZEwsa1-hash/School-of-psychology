import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, User, ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { EnrollButton } from '@/components/site/EnrollButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return courses.map(c => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await prisma.course.findUnique({ where: { slug } })
  if (!course) return { title: 'Курс не найден' }
  return {
    title: course.title,
    description: course.description,
  }
}

function formatPrice(kopecks: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(kopecks / 100)
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { teacher: true },
  })

  if (!course || !course.published) notFound()

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      {/* Back link */}
      <div className="container-site pt-8 pb-0">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm text-[#9B6B4E] hover:text-[#3D1F0E] transition-colors"
        >
          <ArrowLeft size={14} />
          Все курсы
        </Link>
      </div>

      <div className="container-site py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-[#3D1F0E] mb-4 text-balance">
                {course.title}
              </h1>
              <p className="text-lg text-[#9B6B4E] leading-relaxed">
                {course.description}
              </p>
            </div>

            {course.content && (
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFD0]">
                <h2 className="font-serif text-2xl text-[#3D1F0E] mb-4">О программе</h2>
                <div className="prose prose-sm max-w-none text-[#6B3A25] whitespace-pre-line">
                  {course.content}
                </div>
              </div>
            )}

            {/* Teacher */}
            {course.teacher && (
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFD0]">
                <h2 className="font-serif text-2xl text-[#3D1F0E] mb-4">Преподаватель</h2>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#E8DFD0] flex items-center justify-center shrink-0">
                    <User size={28} className="text-[#9B6B4E]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#3D1F0E]">{course.teacher.name}</h3>
                    <p className="text-sm text-[#9B6B4E] mb-2">{course.teacher.specialization}</p>
                    <p className="text-sm text-[#6B3A25] leading-relaxed">{course.teacher.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD0] sticky top-24 space-y-5">
              <div>
                <p className="text-3xl font-serif text-[#3D1F0E]">
                  {formatPrice(course.price)}
                </p>
                <p className="text-sm text-[#9B6B4E]">полная стоимость</p>
              </div>

              <div className="space-y-3 text-sm border-t border-[#F5F0E8] pt-4">
                <div className="flex items-center gap-3 text-[#6B3A25]">
                  <Clock size={16} className="text-[#9B6B4E]" />
                  <span>Длительность: <strong>{course.duration}</strong></span>
                </div>
                {course.teacher && (
                  <div className="flex items-center gap-3 text-[#6B3A25]">
                    <User size={16} className="text-[#9B6B4E]" />
                    <span>{course.teacher.name}</span>
                  </div>
                )}
              </div>

              <EnrollButton courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
