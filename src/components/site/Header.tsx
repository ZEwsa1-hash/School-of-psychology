'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#F5F0E8] border-b border-[#E8DFD0]">
      <div className="container-site flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-serif text-3xl leading-none text-[#3D1F0E]">Ψ</span>
          <span className="hidden sm:block text-sm font-medium text-[#3D1F0E] leading-tight">
            Школа<br />психологии
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {siteConfig.nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm transition-colors hover:text-[#3D1F0E]',
                pathname === item.href
                  ? 'text-[#3D1F0E] font-medium'
                  : 'text-[#9B6B4E]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-1.5 text-sm text-[#3D1F0E] hover:text-[#6B3A25]"
          >
            <Phone size={14} />
            {siteConfig.contacts.phone}
          </a>
          <Button
            asChild
            className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8] text-sm h-9 px-4"
          >
            <Link href="/courses">Программы</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button
              className="p-2 text-[#3D1F0E]"
              aria-label="Открыть меню"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#F5F0E8] border-[#E8DFD0] w-72">
            <div className="flex flex-col gap-1 mt-8">
              {siteConfig.nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'py-3 px-4 rounded-md text-base transition-colors',
                    pathname === item.href
                      ? 'bg-[#3D1F0E] text-[#F5F0E8]'
                      : 'text-[#3D1F0E] hover:bg-[#E8DFD0]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-[#E8DFD0]">
                <a
                  href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 py-2 px-4 text-[#3D1F0E]"
                >
                  <Phone size={16} />
                  {siteConfig.contacts.phone}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
