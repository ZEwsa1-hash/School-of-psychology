import type { Metadata } from 'next'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Преподаватели',
  description: 'Наши преподаватели — опытные специалисты в области психологии.',
}

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div>
      <section className="bg-[#F5F0E8] py-16">
        <div className="container-site text-center">
          <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
            Команда
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#3D1F0E]">
            Наши преподаватели
          </h1>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.map(teacher => (
              <article key={teacher.id} className="flex gap-6 p-6 bg-[#F5F0E8] rounded-2xl">
                <div className="relative w-24 h-24 rounded-2xl bg-[#E8DFD0] flex items-center justify-center shrink-0 grayscale overflow-hidden">
                  {teacher.photo ? (
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <User size={36} className="text-[#C4A882]" />
                  )}
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-[#3D1F0E] mb-1">{teacher.name}</h2>
                  <p className="text-sm font-medium text-[#6B3A25] mb-2">{teacher.specialization}</p>
                  <p className="text-sm text-[#9B6B4E] leading-relaxed">{teacher.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
