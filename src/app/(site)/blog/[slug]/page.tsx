export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return posts.map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return { title: 'Статья не найдена' }
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })

  if (!post || !post.published) notFound()

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      <div className="container-site pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#9B6B4E] hover:text-[#3D1F0E] transition-colors"
        >
          <ArrowLeft size={14} />
          Все статьи
        </Link>
      </div>

      <article className="container-site py-10 max-w-3xl">
        <header className="mb-8">
          <time className="text-sm text-[#9B6B4E]">{formatDate(post.createdAt)}</time>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3D1F0E] mt-3 mb-4 text-balance">
            {post.title}
          </h1>
          <p className="text-lg text-[#9B6B4E] leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="bg-white rounded-2xl p-8 border border-[#E8DFD0]">
          <div className="prose prose-stone max-w-none whitespace-pre-line text-[#3D1F0E] leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  )
}
