import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/site/HeroSection'
import { CoursesSection } from '@/components/site/CoursesSection'
import { AboutSection } from '@/components/site/AboutSection'
import { TeachersSection } from '@/components/site/TeachersSection'
import { CertificatesSection } from '@/components/site/CertificatesSection'
import { FaqSection } from '@/components/site/FaqSection'
import { ContactForm } from '@/components/site/ContactForm'

export const metadata: Metadata = {
  title: 'Школа психологии — профессиональное образование',
  description: 'Курсы по психологии, КПТ, семейной терапии от ведущих специалистов. Документы государственного образца.',
}

export default async function HomePage() {
  const [courses, teachers] = await Promise.all([
    prisma.course.findMany({
      where: { published: true },
      include: { teacher: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.teacher.findMany({
      orderBy: { sortOrder: 'asc' },
    }),
  ])

  return (
    <>
      <HeroSection />
      <CoursesSection courses={courses} />
      <AboutSection />
      <TeachersSection teachers={teachers} />
      <CertificatesSection />
      <FaqSection />
      <ContactForm />
    </>
  )
}
