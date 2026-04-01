'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'

const CERT_CHARS = 10
const DIPL_CHARS = 6
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
        <div className="grid gap-y-10 md:grid-cols-[minmax(0,362px)_minmax(220px,286px)_minmax(0,1fr)] md:items-start md:gap-x-6 lg:gap-x-10">
          <div className="flex flex-col gap-5">
            <div className="relative mx-auto aspect-[362/261] w-full max-w-[362px] md:mx-0">
              <div className="absolute inset-0 overflow-hidden rounded-sm border border-[#2C2A26]">
                <Image
                  src="/assets/certificate.png"
                  alt="Сертификат"
                  fill
                  sizes="(max-width: 768px) 90vw, 362px"
                  className="object-cover"
                />
              </div>
            </div>

            <p className="max-w-[362px] text-justify text-[15px] leading-[1.55] text-[#1C1A17]">
              <span className="font-bold" style={typewriterStyle(CERT_CHARS, visible)}>
                Сертификат
              </span>{' '}
              выдаётся после прохождения краткосрочных программ, интенсивов и отдельных курсов.
              Он подтверждает участие и освоение материала
            </p>
          </div>

          <div className="order-2 flex justify-center md:order-2 md:justify-end">
            <div className="relative aspect-[286/399] w-full max-w-[240px] md:max-w-[286px] md:translate-x-[140px]">
              <div className="absolute inset-0 overflow-hidden rounded-sm border border-[#2C2A26]">
                <Image
                  src="/assets/diploma.png"
                  alt="Диплом"
                  fill
                  sizes="(max-width: 768px) 70vw, 286px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="order-3 flex items-end md:order-3 md:justify-self-end md:pt-[281px]">
            <p className="max-w-[420px] text-justify text-[15px] leading-[1.55] text-[#1C1A17]">
              <span className="font-bold" style={typewriterStyle(DIPL_CHARS, visible)}>
                Диплом
              </span>{' '}
              получают студенты, успешно завершившие полноценную образовательную программу
              академии и выполнившие все итоговые задания. Такой документ подтверждает более
              глубокую подготовку и комплексные знания в области психологии
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
