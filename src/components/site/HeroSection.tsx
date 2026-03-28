import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="bg-[#F5F0E8] overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px] items-center gap-8 py-12 lg:py-0">
          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest">
                Профессиональное образование
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#3D1F0E] leading-[1.1] text-balance">
                Откройте мир психологии
              </h1>
              <p className="text-lg text-[#9B6B4E] max-w-md leading-relaxed">
                Курсы от ведущих специалистов, практические методы и документы об образовании
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8] text-base px-8"
              >
                <Link href="/courses">Записаться на курс</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-[#3D1F0E] hover:bg-[#E8DFD0] text-base gap-2"
              >
                <Link href="/about">
                  Узнать больше <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <p className="font-serif text-3xl text-[#3D1F0E]">4+</p>
                <p className="text-xs text-[#9B6B4E]">курса</p>
              </div>
              <div className="w-px h-8 bg-[#E8DFD0]" />
              <div className="text-center">
                <p className="font-serif text-3xl text-[#3D1F0E]">4</p>
                <p className="text-xs text-[#9B6B4E]">преподавателя</p>
              </div>
              <div className="w-px h-8 bg-[#E8DFD0]" />
              <div className="text-center">
                <p className="font-serif text-3xl text-[#3D1F0E]">100+</p>
                <p className="text-xs text-[#9B6B4E]">выпускников</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-72 sm:h-96 lg:h-[600px] lg:-mr-8 xl:-mr-16 rounded-l-2xl lg:rounded-l-3xl overflow-hidden bg-[#E8DFD0]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-[120px] lg:text-[180px] text-[#C4A882] opacity-40 select-none">
                  Ψ
                </span>
              </div>
              {/* Decorative circle */}
              <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-[#3D1F0E] opacity-10" />
              <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-[#6B3A25] opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
