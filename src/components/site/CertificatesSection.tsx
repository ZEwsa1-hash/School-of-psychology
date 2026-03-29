'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import Image from 'next/image'

// chars × speed = total duration; steps = char count
const CERT_CHARS = 10  // "Сертификат"
const DIPL_CHARS = 6   // "Диплом"
const MS_PER_CHAR = 40

function typewriterStyle(chars: number, visible: boolean): CSSProperties {
  if (!visible) {
    return { display: 'inline-block', clipPath: 'inset(0 100% 0 0)' }
  }
  return {
    display: 'inline-block',
    animation: `typewriter ${chars * MS_PER_CHAR}ms steps(${chars}, end) both`,
  }
}

export function CertificatesSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-[#F3F2EE] py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col md:flex-row items-stretch">

          {/* Left: certificate image top, text bottom */}
          <div className="flex-1 flex flex-col justify-between gap-10 pr-0 md:pr-12 pb-12 md:pb-0">
            <div className="relative w-full max-w-[400px] mx-auto md:mx-0 aspect-[362/261]">
              <div className="absolute inset-0 border border-[#2C2A26] rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/assets/certificate.png"
                  alt="Сертификат"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>

            <p className="text-[15px] text-[#1C1A17] leading-[1.75] text-justify max-w-[380px]">
              <span className="font-bold" style={typewriterStyle(CERT_CHARS, visible)}>
                Сертификат
              </span>{' '}
              выдаётся после прохождения
              краткосрочных программ, интенсивов и
              отдельных курсов. Он подтверждает участие и
              освоение материала
            </p>
          </div>

          {/* Vertical dashed divider */}
          <div className="hidden md:block w-px border-l border-dashed border-[#B0A99A] self-stretch mx-0" />

          {/* Right: diploma image left + text right */}
          <div className="flex-1 flex flex-col md:flex-row items-start gap-8 pl-0 md:pl-12 pt-12 md:pt-0">
            <div className="relative w-full max-w-[240px] mx-auto md:mx-0 flex-shrink-0 aspect-[286/399]">
              <div className="absolute inset-0 border border-[#2C2A26] rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/assets/diploma.png"
                  alt="Диплом"
                  fill
                  sizes="(max-width: 768px) 70vw, 240px"
                  className="object-cover"
                />
              </div>
            </div>

            <p className="text-[15px] text-[#1C1A17] leading-[1.75] text-justify flex-1 md:pt-4">
              <span className="font-bold" style={typewriterStyle(DIPL_CHARS, visible)}>
                Диплом
              </span>{' '}
              получают студенты, успешно
              завершившие полноценную образовательную
              программу академии и выполнившие все итоговые
              задания. Такой документ подтверждает более
              глубокую подготовку и комплексные знания в
              области психологии
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
