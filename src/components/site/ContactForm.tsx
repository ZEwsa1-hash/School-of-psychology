'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createContactRequest } from '@/app/actions/contact'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z.string().min(10, 'Введите телефон'),
  consent: z.boolean().refine(v => v === true, 'Необходимо ваше согласие'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  })

  const consent = watch('consent')
  const name = watch('name', '')
  const phone = watch('phone', '')
  const isFormReady = name.trim().length > 0 && phone.trim().length > 0

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await createContactRequest({
      name: data.name,
      phone: data.phone,
    })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <section className="py-16 md:py-24 bg-[#F4F3EF]">
        <div className="container-site max-w-[1440px]">
          <div className="max-w-lg mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow">
              <span className="font-serif text-3xl text-[#2E1700]">✓</span>
            </div>
            <h2 className="font-serif text-3xl text-[#2E1700]">Заявка отправлена!</h2>
            <p className="text-[#2E1700]/60">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-[#F4F3EF]">
      <div className="container-site max-w-[1440px]">
        <div className="flex flex-col md:flex-row gap-[34px] md:gap-[108px] items-stretch md:items-start">

          {/* Left block — image (hidden on mobile) */}
          <div className="hidden md:block w-full md:max-w-[542px] md:flex-shrink-0">
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: '542 / 433' }}>
              <Image
                src="/assets/contact-brain.png"
                alt="Подбор курса"
                fill
                sizes="(max-width: 768px) 100vw, 542px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right block — form card */}
          <div
            className="flex-1 md:flex-none h-[329px] md:w-[626px] md:h-[433px] md:min-h-[433px] rounded-[20px] bg-white px-[25px] py-[25px] flex flex-col justify-start"
            style={{ boxShadow: '0px 4px 32.2px 0px #00000040' }}
          >
            <h2 className="font-serif text-[32px] md:text-[40px] leading-tight text-[#2E1700] mb-6 md:w-[340px] md:min-h-[72px]">
              Нужна помощь в подборе курса?
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name input */}
              <input
                type="text"
                placeholder="Имя"
                {...register('name')}
                className="w-full bg-[#EAEAEA] border border-[#E8DFD0] rounded-[10px] px-4 py-3 text-[#2E1700] placeholder-[#2E1700]/40 outline-none focus:border-[#2E1700] transition-colors"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}

              {/* Phone input */}
              <input
                type="tel"
                placeholder="+ 375 (00) 000 00 00"
                {...register('phone')}
                className="w-full bg-[#EAEAEA] border border-[#E8DFD0] rounded-[10px] px-4 py-3 text-[#2E1700] placeholder-[#2E1700]/40 outline-none focus:border-[#2E1700] transition-colors mt-3"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
              )}

              {/* Consent checkbox */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={e => setValue('consent', e.target.checked)}
                  className="w-4 h-4 accent-[#2E1700] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="consent" className="text-sm text-[#2E1700] cursor-pointer leading-snug">
                  Даю согласие на обработку персональных данных
                </label>
              </div>
              {errors.consent && (
                <p className="text-sm text-red-500 mt-1">{errors.consent.message}</p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !isFormReady}
                className={cn(
                  'w-full mt-6 h-12 text-white rounded-[10px] text-base font-medium transition-colors',
                  isFormReady
                    ? 'bg-[#5B3E2B] hover:bg-[#2E1700]'
                    : 'bg-[#B8B8B8] cursor-not-allowed'
                )}
              >
                {loading ? 'Отправка...' : 'Оставить заявку'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
