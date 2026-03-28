import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { CoursesSection } from '@/components/site/CoursesSection'

export const metadata: Metadata = {
  title: 'Курсы',
  description: 'Все программы Школы психологии — базовые и профессиональные курсы.',
}

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: { teacher: true },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="pt-2">
      <CoursesSection
        courses={courses}
        title="Все программы"
        subtitle="Выберите курс, который подходит именно вам"
      />
    </div>
  )
}
