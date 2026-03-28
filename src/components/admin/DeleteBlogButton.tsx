'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteBlogPost } from '@/app/actions/admin/blog'

export function DeleteBlogButton({ id }: { id: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
      onClick={async () => {
        if (!confirm('Удалить эту статью?')) return
        await deleteBlogPost(id)
      }}
    >
      <Trash2 size={14} />
    </Button>
  )
}
