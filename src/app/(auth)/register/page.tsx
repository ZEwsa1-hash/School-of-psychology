'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { registerUser } from '@/app/actions/auth'

const registerSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

type RegisterData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterData) => {
    setLoading(true)
    setError(null)
    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    setLoading(false)
    if (!result.success) {
      setError(result.error ?? 'Ошибка регистрации')
      return
    }
    router.push('/login?registered=1')
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-[#E8DFD0]">
      <CardHeader className="text-center space-y-2 pb-2">
        <div className="text-4xl font-serif text-[#3D1F0E]">Ψ</div>
        <CardTitle className="font-serif text-2xl text-[#3D1F0E]">Регистрация</CardTitle>
        <CardDescription className="text-[#9B6B4E]">Создайте аккаунт студента</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-[#3D1F0E]">Имя</Label>
            <Input
              id="name"
              placeholder="Иван Иванов"
              {...register('name')}
              className="border-[#E8DFD0] bg-white focus-visible:ring-[#3D1F0E]"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

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

          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-[#3D1F0E]">Подтвердить пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••"
              {...register('confirmPassword')}
              className="border-[#E8DFD0] bg-white focus-visible:ring-[#3D1F0E]"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
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
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>

          <p className="text-center text-sm text-[#9B6B4E]">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-[#3D1F0E] hover:underline font-medium">
              Войти
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
