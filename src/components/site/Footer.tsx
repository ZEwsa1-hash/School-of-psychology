import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-[#3D1F0E] text-[#F5F0E8]">
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
            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                aria-label="ВКонтакте"
                className="w-8 h-8 rounded-full border border-[#6B3A25] flex items-center justify-center text-xs hover:bg-[#6B3A25] transition-colors"
              >
                VK
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#6B3A25] flex items-center justify-center text-xs hover:bg-[#6B3A25] transition-colors"
              >
                IG
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="w-8 h-8 rounded-full border border-[#6B3A25] flex items-center justify-center text-xs hover:bg-[#6B3A25] transition-colors"
              >
                TG
              </a>
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
