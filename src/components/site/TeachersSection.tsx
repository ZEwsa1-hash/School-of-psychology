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
    <article className="group text-center">
      {/* Photo */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8DFD0] mb-4 grayscale hover:grayscale-0 transition-all">
        {teacher.photo ? (
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <User size={48} className="text-[#C4A882] mb-2" />
            <span className="text-xs text-[#9B6B4E]">Фото</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#3D1F0E] opacity-0 group-hover:opacity-10 transition-opacity" />
      </div>

      <h3 className="font-serif text-xl text-[#3D1F0E] mb-1">{teacher.name}</h3>
      <p className="text-sm text-[#9B6B4E]">{teacher.specialization}</p>
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
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
            Команда
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D1F0E] text-balance">
            Наши преподаватели
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {teachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </section>
  )
}
