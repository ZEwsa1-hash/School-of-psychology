'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteCourse } from '@/app/actions/admin/courses'

export function DeleteCourseButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (!confirm('Удалить этот курс?')) return
    await deleteCourse(id)
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
      onClick={handleDelete}
    >
      <Trash2 size={14} />
    </Button>
  )
}
