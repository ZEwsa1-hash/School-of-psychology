import { Award, GraduationCap } from 'lucide-react'

const certificates = [
  {
    icon: Award,
    title: 'Свидетельство',
    description: 'Выдаётся по окончании базовых и специализированных курсов продолжительностью от 72 часов.',
  },
  {
    icon: GraduationCap,
    title: 'Диплом о профессиональной переподготовке',
    description: 'Выдаётся по программам профессиональной переподготовки объёмом от 250 часов.',
  },
]

export function CertificatesSection() {
  return (
    <section className="section-py bg-[#3D1F0E]">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#C4A882] uppercase tracking-widest mb-3">
            Документы
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] text-balance">
            Документы об образовании
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {certificates.map(cert => {
            const Icon = cert.icon
            return (
              <div
                key={cert.title}
                className="bg-[#6B3A25] bg-opacity-40 border border-[#6B3A25] rounded-2xl p-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#6B3A25] flex items-center justify-center mx-auto">
                  <Icon size={28} className="text-[#F5F0E8]" />
                </div>
                <h3 className="font-serif text-2xl text-[#F5F0E8]">{cert.title}</h3>
                <p className="text-[#C4A882] text-sm leading-relaxed">{cert.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
