import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

const socials = [
  { href: '#', icon: '/icons/vk.png', label: 'ВКонтакте' },
  { href: '#', icon: '/icons/instagram.png', label: 'Instagram' },
  { href: '#', icon: '/icons/telegram.png', label: 'Telegram' },
]

export function Footer() {
  return (
    <footer className="bg-[#2E1700] text-[#F4F3EF]">
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-3xl leading-none">Ψ</span>
              <span className="text-sm font-medium leading-tight">Школа<br />психологии</span>
            </Link>
            <p className="text-sm text-[#C4A882]">
              Профессиональное образование в области психологии от ведущих специалистов
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[#6B3A25] flex items-center justify-center hover:bg-[#6B3A25] transition-colors overflow-hidden"
                >
                  <Image src={icon} alt={label} width={20} height={20} className="object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-medium text-[#C4A882] mb-4 uppercase tracking-wider">
              Навигация
            </h3>
            <ul className="space-y-2">
              {siteConfig.nav.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#E8DFD0] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-sm font-medium text-[#C4A882] mb-4 uppercase tracking-wider">
              Контакты
            </h3>
            <ul className="space-y-2 text-sm text-[#E8DFD0]">
              <li>
                <a
                  href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contacts.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#6B3A25] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9B6B4E]">
          <p>© {new Date().getFullYear()} Школа психологии. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#E8DFD0] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-[#E8DFD0] transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
