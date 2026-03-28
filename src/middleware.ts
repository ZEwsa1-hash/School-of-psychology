import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session?.user
  const role = session?.user?.role

  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isStudentRoute = nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin', nextUrl))
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', nextUrl))
    if (role !== 'ADMIN') return NextResponse.redirect(new URL('/', nextUrl))
  }

  // Protect student routes
  if (isStudentRoute) {
    if (!isLoggedIn) return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/login', '/register'],
}
