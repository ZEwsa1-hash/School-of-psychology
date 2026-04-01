import { Suspense } from 'react'

import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
