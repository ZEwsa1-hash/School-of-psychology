'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { enrollCourse } from '@/app/actions/enrollment'

interface EnrollButtonProps {
  courseId: string
}

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleEnroll = async () => {
    setLoading(true)
    const result = await enrollCourse(courseId)
    setLoading(false)
    if (!result) return
    if (result.success) {
      setMessage('Заявка принята! Проверьте личный кабинет.')
      router.refresh()
    } else {
      setMessage(result.message ?? 'Произошла ошибка')
    }
  }

  if (message) {
    return (
      <div className="rounded-xl bg-[#F5F0E8] p-4 text-sm text-[#3D1F0E] text-center border border-[#E8DFD0]">
        {message}
      </div>
    )
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={loading}
      className="w-full bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8] h-12 text-base"
    >
      {loading ? 'Отправка...' : 'Записаться на курс'}
    </Button>
  )
}
