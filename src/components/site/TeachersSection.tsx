import Image from 'next/image'
import { User } from 'lucide-react'

type Teacher = {
  id: string
  name: string
  bio: string
  photo: string | null
  specialization: string
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article>
      {/* Photo */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DFD0] mb-4">
        {teacher.photo ? (
          <Image
            src={teacher.photo}
            alt={teacher.name}
            fill
            sizes="(max-width: 768px) 48vw, 25vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User size={48} className="text-[#C4A882]" />
          </div>
        )}
      </div>

      {/* Name + link */}
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h3
          style={{
            fontFamily: 'var(--font-muller)',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: 1,
            letterSpacing: 0,
            color: '#1a1a1a',
          }}
        >
          {teacher.name}
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-muller)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1,
          }}
          className="text-[#9B6B4E] whitespace-nowrap shrink-0 cursor-pointer hover:underline"
        >
          ещё...
        </span>
      </div>

      {/* Specialization */}
      <p
        style={{
          fontFamily: 'var(--font-muller)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: 1,
          letterSpacing: 0,
          color: '#6b6b6b',
        }}
      >
        {teacher.specialization}
      </p>
    </article>
  )
}

interface TeachersSectionProps {
  teachers: Teacher[]
}

export function TeachersSection({ teachers }: TeachersSectionProps) {
  return (
    <section className="section-py bg-white">
      <div className="container-site">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-10">
          Преподаватели
        </h2>

        {/* Mobile: touch-scrollable horizontal carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
          {teachers.map(teacher => (
            <div key={teacher.id} className="flex-shrink-0 w-[56vw] snap-start">
              <TeacherCard teacher={teacher} />
            </div>
          ))}
        </div>

        {/* Tablet / Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {teachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </section>
  )
}
