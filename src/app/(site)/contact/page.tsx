import type { Metadata } from 'next'
import { Phone, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/site/ContactForm'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с нами — мы поможем подобрать курс.',
}

export default function ContactPage() {
  return (
    <div>
      <section className="bg-[#F5F0E8] py-16">
        <div className="container-site text-center">
          <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
            Контакты
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#3D1F0E]">
            Свяжитесь с нами
          </h1>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-start gap-4 p-6 bg-[#F5F0E8] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#3D1F0E] flex items-center justify-center shrink-0">
                <Phone size={18} className="text-[#F5F0E8]" />
              </div>
              <div>
                <p className="text-sm text-[#9B6B4E] mb-1">Телефон</p>
                <a
                  href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                  className="font-medium text-[#3D1F0E] hover:text-[#6B3A25]"
                >
                  {siteConfig.contacts.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-[#F5F0E8] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#3D1F0E] flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[#F5F0E8]" />
              </div>
              <div>
                <p className="text-sm text-[#9B6B4E] mb-1">Email</p>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="font-medium text-[#3D1F0E] hover:text-[#6B3A25]"
                >
                  {siteConfig.contacts.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-[#F5F0E8] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#3D1F0E] flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#F5F0E8]" />
              </div>
              <div>
                <p className="text-sm text-[#9B6B4E] mb-1">Адрес</p>
                <p className="font-medium text-[#3D1F0E]">г. Москва, ул. Примерная, д. 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
