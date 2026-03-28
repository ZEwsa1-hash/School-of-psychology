import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { createBlogPost } from '@/app/actions/admin/blog'

export const metadata: Metadata = { title: 'Новая статья — Администратор' }

export default function NewBlogPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog" className="text-[#9B6B4E] hover:text-[#3D1F0E]"><ArrowLeft size={20} /></Link>
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Новая статья</h1>
      </div>
      <form action={createBlogPost} className="bg-white rounded-2xl p-6 border border-[#E8DFD0] space-y-4">
        <div className="space-y-1">
          <Label htmlFor="title">Заголовок *</Label>
          <Input id="title" name="title" required className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" required className="border-[#E8DFD0]" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="excerpt">Краткое описание *</Label>
          <Textarea id="excerpt" name="excerpt" required rows={2} className="border-[#E8DFD0] resize-none" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="content">Контент (Markdown) *</Label>
          <Textarea id="content" name="content" required rows={12} className="border-[#E8DFD0] font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">URL изображения</Label>
          <Input id="imageUrl" name="imageUrl" type="url" className="border-[#E8DFD0]" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="published" name="published" className="border-[#C4A882]" />
          <Label htmlFor="published" className="cursor-pointer">Опубликовать</Label>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">Создать</Button>
          <Button asChild variant="outline" className="border-[#E8DFD0]">
            <Link href="/admin/blog">Отмена</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
