'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Menu, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!searchOpen) return
    inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    if (pathname === '/courses') {
      setSearchValue(searchParams.get('search') ?? '')
      return
    }

    setSearchValue('')
  }, [pathname, searchParams])

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const query = searchValue.trim()
    const params = new URLSearchParams()

    if (query) {
      params.set('search', query)
    }

    router.push(params.toString() ? `/courses?${params.toString()}` : '/courses')
  }

  function handleSearchClose() {
    setSearchOpen(false)
    setSearchValue('')
  }

  return (
    <header className="bg-[#F4F3EF] pt-[42px] pb-[15px]">
      <div className="container-site">
        <div className="mx-auto flex min-h-[76px] max-w-[1280px] items-center gap-4 rounded-[10px] border border-[#5B3E2B] bg-[#F4F3EF] px-5 py-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/logo-decor.png"
              alt="Академия психологии"
              width={62}
              height={62}
              className="object-contain"
            />
          </Link>

          <a
            href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
            className="ml-3 mr-auto hidden text-left text-sm font-medium text-[#2E1700] transition-colors hover:text-[#5B3E2B] lg:block"
          >
            {siteConfig.contacts.phone}
          </a>

          <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex">
            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className={cn(
                'flex items-center overflow-hidden rounded-[14px] transition-all duration-300',
                searchOpen
                  ? 'h-[52px] w-[408px] border border-[#B8B0A7] bg-[#F4F3EF] px-4'
                  : 'h-[52px] w-[52px] border border-transparent bg-transparent px-0'
              )}
            >
              <button
                type="button"
                aria-label="Поиск"
                onClick={() => {
                  if (!searchOpen) {
                    setSearchOpen(true)
                    return
                  }

                  if (searchValue.trim()) {
                    inputRef.current?.form?.requestSubmit()
                    return
                  }

                  if (!searchValue.trim()) {
                    handleSearchClose()
                  }
                }}
                className={cn(
                  'flex shrink-0 items-center justify-center text-[#6E4D38] transition-all duration-300 hover:text-[#5B3E2B]',
                  searchOpen ? 'order-3 h-[52px] w-[40px]' : 'h-[52px] w-[52px]'
                )}
              >
                <Search className={cn(searchOpen ? 'size-8' : 'size-6')} strokeWidth={2.1} />
              </button>

              <input
                ref={inputRef}
                type="search"
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                placeholder="Найти программу"
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    handleSearchClose()
                  }
                }}
                className={cn(
                  'min-w-0 bg-transparent text-[15px] font-medium leading-none text-[#2E1700] outline-none placeholder:font-medium placeholder:text-[#B8B0A7] transition-all duration-300',
                  searchOpen ? 'h-[52px] w-full pr-3 opacity-100' : 'h-[52px] w-0 px-0 opacity-0'
                )}
              />

              <button
                type="button"
                aria-label="Закрыть поиск"
                onClick={handleSearchClose}
                className="hidden"
              >
              </button>

              <button
                type="submit"
                aria-label="Отправить поиск"
                className="hidden"
              >
                <Search className="size-8" strokeWidth={2.1} />
              </button>
            </form>

            <Button
              asChild
              className="min-h-[58px] rounded-[10px] bg-[#5B3E2B] px-7 py-4 text-[15px] font-medium leading-none text-[#F4F3EF] transition-colors hover:bg-[#2E1700]"
            >
              <Link href="/courses">Программы</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="ml-auto lg:hidden">
              <button className="p-2 text-[#2E1700]" aria-label="Открыть меню">
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-[#E8DFD0] bg-[#F4F3EF]">
              <div className="mt-8 flex flex-col gap-1">
                {siteConfig.nav.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-4 py-3 text-base transition-colors',
                      pathname === item.href
                        ? 'bg-[#5B3E2B] text-[#F4F3EF]'
                        : 'text-[#2E1700] hover:bg-[#E8DFD0]'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 border-t border-[#E8DFD0] pt-4">
                  <a
                    href={`tel:${siteConfig.contacts.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-2 px-4 py-2 text-[#2E1700]"
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
