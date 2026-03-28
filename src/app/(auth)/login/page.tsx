'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginData) => {
    setLoading(true)
    setError(null)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError('Неверный email или пароль')
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-[#E8DFD0]">
      <CardHeader className="text-center space-y-2 pb-2">
        <div className="text-4xl font-serif text-[#3D1F0E]">Ψ</div>
        <CardTitle className="font-serif text-2xl text-[#3D1F0E]">Вход в аккаунт</CardTitle>
        <CardDescription className="text-[#9B6B4E]">Школа психологии</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-[#3D1F0E]">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.ru"
              {...register('email')}
              className="border-[#E8DFD0] bg-white focus-visible:ring-[#3D1F0E]"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-[#3D1F0E]">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              {...register('password')}
              className="border-[#E8DFD0] bg-white focus-visible:ring-[#3D1F0E]"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]"
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>

          <p className="text-center text-sm text-[#9B6B4E]">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-[#3D1F0E] hover:underline font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
