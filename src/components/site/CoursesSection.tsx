'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type PriceOption = {
  duration: string
  price: string
}

type GoalCourse = {
  id: string
  slug: string
  title: string
  imageUrl: string | null
  badges: string[]
  options: PriceOption[]
}

const GOAL_COURSES: GoalCourse[] = [
  {
    id: '1',
    slug: 'psihosomatika',
    title: 'Психосоматика и телесно-ориентированная терапия',
    imageUrl: null,
    badges: ['диплом', 'онлайн', 'оффлайн'],
    options: [
      { duration: '9 Месяцев / 1000 часов', price: '500$' },
      { duration: '15 Месяцев / 1740 часов', price: '700$' },
    ],
  },
  {
    id: '2',
    slug: 'psiholog-kouch',
    title: 'Профессия Психолог-коуч',
    imageUrl: '/courses/goal-1.png',
    badges: ['диплом', 'оффлайн'],
    options: [
      { duration: '9 Месяцев / 1000 часов', price: '500$' },
      { duration: '15 Месяцев / 1740 часов', price: '700$' },
    ],
  },
  {
    id: '3',
    slug: 'povyshenie-kvalifikacii',
    title: 'Онлайн-курсы повышения квалификации психологов',
    imageUrl: '/courses/goal-5.png',
    badges: ['диплом', 'онлайн'],
    options: [
      { duration: '9 Месяцев / 1000 часов', price: '500$' },
      { duration: '15 Месяцев / 1740 часов', price: '700$' },
    ],
  },
  {
    id: '4',
    slug: 'psihologiya-semeynyh-otnosheniy',
    title: 'Полный онлайн-курс психологии семейных отношений',
    imageUrl: '/courses/goal-4.png',
    badges: ['диплом', 'онлайн', 'оффлайн'],
    options: [
      { duration: '9 Месяцев / 1000 часов', price: '500$' },
      { duration: '15 Месяцев / 1740 часов', price: '700$' },
    ],
  },
  {
    id: '5',
    slug: 'emocionalnyy-intellekt',
    title: 'Онлайн-курсы эмоционального интеллекта',
    imageUrl: '/courses/goal-3.png',
    badges: ['диплом', 'онлайн', 'оффлайн'],
    options: [
      { duration: '9 Месяцев / 1000 часов', price: '500$' },
      { duration: '15 Месяцев / 1740 часов', price: '700$' },
    ],
  },
  {
    id: '6',
    slug: 'trevoga-i-panicheskie-ataki',
    title: 'Курсы по работе с тревогой и паническими атаками',
    imageUrl: '/courses/goal-2.png',
    badges: ['диплом', 'онлайн', 'оффлайн'],
    options: [
      { duration: '9 Месяцев / 1000 часов', price: '500$' },
      { duration: '15 Месяцев / 1740 часов', price: '700$' },
    ],
  },
]

const filters = ['Все курсы', 'Переподготовка', 'Повышение квалификации', 'Курсы по направлениям', 'Профессия']

interface GoalCardProps {
  course: GoalCourse
  /** Delay for the blur-reveal entrance animation (ms) */
  animationDelay?: number
  /** Whether the card should animate (second row) */
  animated?: boolean
}

function GoalCard({ course, animationDelay = 0, animated = false }: GoalCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(!animated)

  useEffect(() => {
    if (!animated) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay per card for stagger effect
          setTimeout(() => setVisible(true), animationDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animated, animationDelay])

  const [diploma, ...rest] = course.badges

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        animated && !visible
          ? 'opacity-0 blur-md translate-y-4'
          : 'opacity-100 blur-0 translate-y-0'
      )}
    >
      <Link href={`/courses/${course.slug}`} className="block group cursor-pointer">
        <article
          className="bg-white border border-[#E8E8E8] rounded-[10px] overflow-hidden flex flex-col hover:border-[#C4A882] hover:shadow-md transition-colors h-[269px] lg:h-[299px]"
          style={{ maxWidth: 392 }}
        >
          {/* Top section: title at top:42px + illustration */}
          <div className="relative flex-1 overflow-hidden">
            {/* Title — positioned at top:42px from card top, height:65px */}
            <div
              className="absolute left-5 right-0 overflow-hidden"
              style={{ top: 42, height: 65, paddingRight: course.imageUrl ? 164 : 20 }}
            >
              <h3
                className="font-medium text-[#1A1A1A] text-[15px] leading-snug line-clamp-3"
                style={{ fontFamily: 'var(--font-muller)' }}
              >
                {course.title}
              </h3>
            </div>

            {/* Illustration — right side, vertically centered */}
            {course.imageUrl && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 148, height: 148 }}
              >
                <Image
                  src={course.imageUrl}
                  alt=""
                  fill
                  sizes="148px"
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-[#EBEBEB]" />

          {/* Bottom: badges + pricing */}
          <div className="px-5 py-4 space-y-2.5">
            <div className="flex gap-1.5 flex-wrap">
              {diploma && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-[3px]"
                  style={{
                    border: '1px solid #2E1700',
                    fontFamily: 'var(--font-muller)',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 1,
                    letterSpacing: 0,
                    color: '#2E1700',
                  }}
                >
                  <Check size={11} strokeWidth={2.5} />
                  {diploma}
                </span>
              )}
              {rest.map(badge => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full px-3 py-[3px]"
                  style={{
                    border: '1px solid #2E1700',
                    fontFamily: 'var(--font-muller)',
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 1,
                    letterSpacing: 0,
                    color: '#2E1700',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {course.options.map((opt, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-[13px] text-[#555]">{opt.duration}</span>
                <span className="text-[13px] font-medium text-[#1A1A1A]">{opt.price}</span>
              </div>
            ))}
          </div>
        </article>
      </Link>
    </div>
  )
}

interface CoursesSectionProps {
  title?: string
}

export function CoursesSection({ title = 'Выберите цель прохождения курсов:' }: CoursesSectionProps) {
  const [activeFilter, setActiveFilter] = useState('Все курсы')
  const filtersRef = useRef<HTMLDivElement>(null)
  const [filtersVisible, setFiltersVisible] = useState(false)

  useEffect(() => {
    const el = filtersRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFiltersVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Split into rows of 3 for the grid
  const firstRow = GOAL_COURSES.slice(0, 3)
  const secondRow = GOAL_COURSES.slice(3)

  return (
    <section className="section-py bg-[#F4F3EF]">
      <div className="container-site">
        <div className="mb-10">
          <h2 className="font-serif text-4xl md:text-5xl text-[#2E1700] text-balance mb-8">
            {title}
          </h2>
        </div>

        {/* Filters — horizontal scroll on mobile, wrap on desktop */}
        <div
          ref={filtersRef}
          className={cn(
            'flex gap-2 mb-10 overflow-x-auto scrollbar-hide pb-1 md:pb-0 md:flex-wrap transition-all duration-700 ease-out',
            filtersVisible
              ? 'opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-5 blur-sm'
          )}
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                'flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors border',
                activeFilter === f
                  ? 'bg-[#2E1700] text-[#F4F3EF] border-[#2E1700]'
                  : 'bg-white text-[#2E1700] border-[#E8DFD0] hover:border-[#C4A882]'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Row 1 — no animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {firstRow.map(course => (
            <GoalCard key={course.id} course={course} animated={false} />
          ))}
        </div>

        {/* Row 2 — blur-reveal animation with stagger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondRow.map((course, i) => (
            <GoalCard
              key={course.id}
              course={course}
              animated={true}
              animationDelay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
