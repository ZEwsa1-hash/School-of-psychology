'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { createContactRequest } from '@/app/actions/contact'

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  phone: z.string().min(10, 'Введите телефон'),
  message: z.string().optional(),
  consent: z.boolean().refine(v => v === true, 'Необходимо ваше согласие'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  })

  const consent = watch('consent')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await createContactRequest({
      name: data.name,
      phone: data.phone,
      message: data.message,
    })
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <section className="section-py bg-white">
        <div className="container-site">
          <div className="max-w-lg mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F5F0E8] flex items-center justify-center mx-auto">
              <span className="font-serif text-3xl text-[#3D1F0E]">✓</span>
            </div>
            <h2 className="font-serif text-3xl text-[#3D1F0E]">Заявка отправлена!</h2>
            <p className="text-[#9B6B4E]">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-py bg-white">
      <div className="container-site">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
              Контакты
            </p>
            <h2 className="font-serif text-4xl text-[#3D1F0E] text-balance">
              Нужна помощь в подборе курса?
            </h2>
            <p className="mt-3 text-[#9B6B4E]">
              Оставьте заявку, и мы поможем выбрать подходящую программу
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[#3D1F0E]">Имя</Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                {...register('name')}
                className="border-[#E8DFD0] bg-[#F5F0E8] focus-visible:ring-[#3D1F0E]"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className="text-[#3D1F0E]">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 000-00-00"
                {...register('phone')}
                className="border-[#E8DFD0] bg-[#F5F0E8] focus-visible:ring-[#3D1F0E]"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="message" className="text-[#3D1F0E]">
                Сообщение <span className="text-[#9B6B4E] font-normal">(необязательно)</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Расскажите, какой курс вас интересует..."
                rows={3}
                {...register('message')}
                className="border-[#E8DFD0] bg-[#F5F0E8] focus-visible:ring-[#3D1F0E] resize-none"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={v => setValue('consent', v === true)}
                className="mt-0.5 border-[#C4A882] data-[state=checked]:bg-[#3D1F0E] data-[state=checked]:border-[#3D1F0E]"
              />
              <label htmlFor="consent" className="text-sm text-[#9B6B4E] cursor-pointer leading-relaxed">
                Я согласен с{' '}
                <a href="/privacy" className="text-[#3D1F0E] hover:underline">
                  политикой обработки персональных данных
                </a>
              </label>
            </div>
            {errors.consent && <p className="text-sm text-red-500">{errors.consent.message}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8] h-12 text-base"
            >
              {loading ? 'Отправка...' : 'Оставить заявку'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
