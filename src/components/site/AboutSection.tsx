import { CheckCircle2 } from 'lucide-react'

const advantages = [
  {
    title: 'Практический подход',
    description: 'Обучение строится на реальных кейсах и практических заданиях, а не только на теории.',
  },
  {
    title: 'Опытные преподаватели',
    description: 'Все преподаватели — действующие специалисты с многолетней практикой.',
  },
  {
    title: 'Гибкий график',
    description: 'Занятия в удобное для вас время: вечерние группы и выходные дни.',
  },
  {
    title: 'Документ об образовании',
    description: 'По окончании выдаётся свидетельство или диплом государственного образца.',
  },
]

export function AboutSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
              Наши преимущества
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#3D1F0E] mb-8 text-balance">
              Почему выбирают нас
            </h2>
            <ul className="space-y-5">
              {advantages.map(item => (
                <li key={item.title} className="flex gap-4">
                  <CheckCircle2
                    size={22}
                    className="text-[#6B3A25] shrink-0 mt-0.5"
                  />
                  <div>
                    <h3 className="font-medium text-[#3D1F0E] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#9B6B4E] leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image placeholder */}
          <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden bg-[#F5F0E8]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <span className="font-serif text-8xl text-[#E8DFD0] mb-4">Ψ</span>
              <p className="font-serif text-2xl text-[#C4A882]">Лекционный зал</p>
              <p className="text-sm text-[#9B6B4E] mt-2">Фотография аудитории</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#3D1F0E] text-[#F5F0E8] rounded-xl p-4 text-center">
              <p className="font-serif text-3xl">5+</p>
              <p className="text-xs text-[#C4A882]">лет работы</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
