import Link from 'next/link'
import Image from 'next/image'

import { siteConfig } from '@/config/site'

const socials = [
  { href: '#', icon: '/icons/vk.png', label: 'ВКонтакте' },
  { href: '#', icon: '/icons/instagram.png', label: 'Instagram' },
  { href: '#', icon: '/icons/telegram.png', label: 'Telegram' },
]

const legalLinks = [
  { href: '/privacy', label: 'Политика конфиденциальности' },
  { href: '/terms', label: 'Пользовательское соглашение' },
  { href: '/offer', label: 'Публичная оферта' },
]

export function Footer() {
  return (
    <footer className="bg-[#2E1700] text-[#F4F3EF] min-h-[230px] md:h-[230px]">
      <div className="container-site h-full flex flex-col justify-between py-8">
        {/* Main row */}
        <div className="flex justify-between items-start">
          {/* Left: logo + phone + legal links */}
          <div className="flex flex-col gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-3xl leading-none text-[#F4F3EF]">Ψ</span>
              <span className="text-sm font-medium leading-tight text-[#F4F3EF]">Школа<br />психологии</span>
            </Link>

            {/* Phone */}
            <a
              href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
              className="text-[#F4F3EF] text-sm hover:opacity-80 transition-opacity mt-[10px]"
            >
              {siteConfig.contacts.phone}
            </a>

            {/* Legal links */}
            <div className="flex flex-col gap-[14px] md:gap-1">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[#F4F3EF] text-sm underline hover:opacity-80 transition-opacity whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-[#F4F3EF] flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden"
              >
                <Image
                  src={icon}
                  alt={label}
                  width={22}
                  height={22}
                  className="object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-start mt-[15px]">
          <p className="text-[#F4F3EF] text-xs">
            © 2025 ООО Академия Психологии и Психотерапии
          </p>
        </div>
      </div>
    </footer>
  )
}
