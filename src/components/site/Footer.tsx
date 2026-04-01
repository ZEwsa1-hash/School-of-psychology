import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '@/config/site'

const socials = [
  { href: '#', icon: '/icons/vk.png', label: 'VKontakte' },
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
    <footer className="bg-[#2E1700] text-[#F4F3EF]">
      <div className="container-site flex min-h-[90px] flex-col justify-between py-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="block w-fit shrink-0">
              <Image
                src="/assets/logo-decor.png"
                alt="Логотип школы психологии"
                width={62}
                height={62}
                className="object-contain"
              />
            </Link>

            <a
              href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
              className="mt-[8px] text-[#F4F3EF] transition-opacity hover:opacity-80"
              style={{
                fontFamily: 'Muller-Trial',
                fontWeight: 400,
                fontSize: '30px',
                lineHeight: '100%',
                letterSpacing: '0',
              }}
            >
              {siteConfig.contacts.phone}
            </a>

            <div className="mt-[15px] flex flex-col gap-[14px] md:gap-1">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="whitespace-nowrap text-sm text-[#F4F3EF] underline transition-opacity hover:opacity-80"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 self-start">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center transition-opacity hover:opacity-80"
              >
                <Image
                  src={icon}
                  alt={label}
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-[4px] flex justify-start md:-mt-5 md:justify-end">
          <p
            className="text-sm font-normal text-[#F4F3EF]"
            style={{
              fontFamily: 'var(--font-sans)',
            }}
          >
            © 2025 ООО Академия Психологии и Психотерапии
          </p>
        </div>
      </div>
    </footer>
  )
}
