export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Статьи о психологии, советы специалистов и интересные материалы.',
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <section className="bg-[#F5F0E8] py-16">
        <div className="container-site text-center">
          <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
            Блог
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#3D1F0E]">
            Статьи и материалы
          </h1>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="text-center text-[#9B6B4E] py-12">Статьи скоро появятся</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <article
                  key={post.id}
                  className="bg-[#F5F0E8] rounded-2xl overflow-hidden border border-[#E8DFD0] hover:border-[#C4A882] transition-colors group"
                >
                  <div className="aspect-[16/9] bg-[#E8DFD0] flex items-center justify-center">
                    <span className="font-serif text-5xl text-[#C4A882]">Ψ</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <time className="text-xs text-[#9B6B4E]">
                      {formatDate(post.createdAt)}
                    </time>
                    <h2 className="font-serif text-xl text-[#3D1F0E] leading-snug line-clamp-2 group-hover:text-[#6B3A25] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#9B6B4E] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-[#3D1F0E] font-medium hover:text-[#6B3A25] transition-colors"
                    >
                      Читать <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
