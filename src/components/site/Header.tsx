'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#F4F3EF] pt-[42px] pb-[15px]">
      <div className="container-site">
      <div className="flex items-center py-3 px-5 gap-4 border border-[#5B3E2B] rounded-[10px] bg-[#F4F3EF] max-w-[1280px] h-[76px] mx-auto">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logo-decor.png"
            alt="Академия психологии"
            width={62}
            height={62}
            className="object-contain"
          />
        </Link>

        {/* Phone — center */}
        <a
          href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
          className="hidden lg:block ml-3 mr-auto text-sm font-medium text-[#2E1700] hover:text-[#5B3E2B] transition-colors text-left"
        >
          {siteConfig.contacts.phone}
        </a>

        {/* Right: search + button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 ml-auto">
          <button
            aria-label="Поиск"
            className="flex size-[35px] items-center justify-center text-[#2E1700] hover:text-[#5B3E2B] transition-colors"
          >
            <svg
              viewBox="0 0 35 35"
              className="size-[35px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2.2" />
              <path d="M20.5 20.5L30 30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
          <Button
            asChild
            className="px-8 h-[50px] rounded-[8px] bg-[#5B3E2B] hover:bg-[#2E1700] text-[#F4F3EF] text-sm font-medium transition-colors"
          >
            <Link href="/courses">Программы</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden ml-auto">
            <button className="p-2 text-[#2E1700]" aria-label="Открыть меню">
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#F4F3EF] border-[#E8DFD0] w-72">
            <div className="flex flex-col gap-1 mt-8">
              {siteConfig.nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'py-3 px-4 rounded-md text-base transition-colors',
                    pathname === item.href
                      ? 'bg-[#5B3E2B] text-[#F4F3EF]'
                      : 'text-[#2E1700] hover:bg-[#E8DFD0]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-[#E8DFD0]">
                <a
                  href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 py-2 px-4 text-[#2E1700]"
                >
                  {siteConfig.contacts.phone}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      </div>
    </header>
  )
}
