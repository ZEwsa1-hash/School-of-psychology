export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { DeleteBlogButton } from '@/components/admin/DeleteBlogButton'

export const metadata: Metadata = { title: 'Блог — Администратор' }

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-[#3D1F0E]">Блог</h1>
        <Button asChild className="bg-[#3D1F0E] hover:bg-[#6B3A25] text-[#F5F0E8]">
          <Link href="/admin/blog/new"><Plus size={16} className="mr-2" />Добавить статью</Link>
        </Button>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
            <tr>
              <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Заголовок</th>
              <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden md:table-cell">Дата</th>
              <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Статус</th>
              <th className="text-right px-4 py-3 text-[#9B6B4E] font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0E8]">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-[#F5F0E8]">
                <td className="px-4 py-3">
                  <p className="font-medium text-[#3D1F0E]">{post.title}</p>
                  <p className="text-xs text-[#9B6B4E] truncate max-w-xs">{post.excerpt}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-[#9B6B4E]">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Опубликована' : 'Черновик'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#9B6B4E]">
                      <Link href={`/admin/blog/${post.id}/edit`}><Pencil size={14} /></Link>
                    </Button>
                    <DeleteBlogButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-[#9B6B4E]">Нет статей</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
