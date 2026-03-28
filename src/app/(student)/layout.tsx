import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <header className="border-b border-[#E8DFD0] bg-white">
        <div className="container-site h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl text-[#3D1F0E]">Ψ</span>
            <span className="text-sm font-medium text-[#3D1F0E]">Школа психологии</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#9B6B4E] hidden sm:block">
              {session.user.name ?? session.user.email}
            </span>
            <Link href="/" className="text-sm text-[#3D1F0E] hover:underline">
              На сайт →
            </Link>
          </div>
        </div>
      </header>
      <main className="container-site py-8">{children}</main>
    </div>
  )
}
