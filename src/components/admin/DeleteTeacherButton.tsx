'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteTeacher } from '@/app/actions/admin/teachers'

export function DeleteTeacherButton({ id }: { id: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
      onClick={async () => {
        if (!confirm('Удалить этого преподавателя?')) return
        await deleteTeacher(id)
      }}
    >
      <Trash2 size={14} />
    </Button>
  )
}
