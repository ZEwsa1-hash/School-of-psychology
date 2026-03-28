export type UserRole = 'ADMIN' | 'STUDENT'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: UserRole
}

declare module 'next-auth' {
  interface User {
    role: UserRole
  }
  interface Session {
    user: AuthUser & { image?: string | null }
  }
}

// next-auth v5 beta uses different JWT module path
declare module '@auth/core/jwt' {
  interface JWT {
    role: UserRole
    id: string
  }
}
