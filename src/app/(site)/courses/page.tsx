import { Suspense } from 'react'

import type { Metadata } from 'next'

import { CoursesSection } from '@/components/site/CoursesSection'

export const metadata: Metadata = {
  title: 'Курсы',
  description: 'Все программы Школы психологии — базовые и профессиональные курсы.',
}

export default function CoursesPage() {
  return (
    <div className="pt-2">
      <Suspense>
        <CoursesSection title="Все программы" />
      </Suspense>
    </div>
  )
}
