'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
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
    imageUrl: '/courses/goal-1-custom.png',
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

const filterTooltips: Record<string, string> = {
  [filters[0]]: '\u041f\u043e\u043a\u0430\u0437\u0430\u043d\u044b \u0432\u0441\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 \u043a\u0443\u0440\u0441\u044b \u0431\u0435\u0437 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u0446\u0438\u0438.',
  [filters[1]]:
    '\u0414\u043b\u044f \u0442\u0435\u0445, \u043a\u0442\u043e \u0441\u043c\u0435\u043b\u043e \u0441\u043c\u043e\u0442\u0440\u0438\u0442 \u0432 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0431\u0443\u0434\u0443\u0449\u0435\u0435, \u0440\u0435\u0448\u0438\u043b \u043e\u0441\u0432\u043e\u0438\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u044e \u0441 \u043d\u0443\u043b\u044f \u0438\u043b\u0438 \u0441\u043c\u0435\u043d\u0438\u0442\u044c \u0441\u0432\u043e\u0439 \u043a\u0430\u0440\u044c\u0435\u0440\u043d\u044b\u0439 \u043f\u0443\u0442\u044c.',
  [filters[2]]:
    '\u0414\u043b\u044f \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u043e\u0432, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0445\u043e\u0442\u044f\u0442 \u0443\u0433\u043b\u0443\u0431\u0438\u0442\u044c \u0437\u043d\u0430\u043d\u0438\u044f, \u043e\u0441\u0432\u043e\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043c\u0435\u0442\u043e\u0434\u044b \u0438 \u0440\u0430\u0441\u0448\u0438\u0440\u0438\u0442\u044c \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u0443\u044e \u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0443.',
  [filters[3]]:
    '\u0414\u043b\u044f \u0442\u0435\u0445, \u043a\u0442\u043e \u0438\u0449\u0435\u0442 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u043f\u043e \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u043e\u043c\u0443 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044e \u0432 \u043f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u0438 \u0438\u043b\u0438 \u0442\u0435\u0440\u0430\u043f\u0438\u0438.',
  [filters[4]]:
    '\u0414\u043b\u044f \u0442\u0435\u0445, \u043a\u0442\u043e \u043f\u043b\u0430\u043d\u0438\u0440\u0443\u0435\u0442 \u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043a\u0430\u0440\u044c\u0435\u0440\u0443 \u0432 \u043f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u0438 \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0441\u0438\u0441\u0442\u0435\u043c\u043d\u0443\u044e \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u0443\u044e \u043f\u043e\u0434\u0433\u043e\u0442\u043e\u0432\u043a\u0443.',
}

interface GoalCardProps {
  course: GoalCourse
  animationDelay?: number
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
        animated && !visible ? 'translate-y-4 opacity-0 blur-md' : 'translate-y-0 opacity-100 blur-0'
      )}
    >
      <Link href={`/courses/${course.slug}`} className="group block cursor-pointer">
        <article
          className="flex h-[318px] flex-col overflow-hidden rounded-[10px] border border-[#E8E8E8] bg-white transition-colors hover:border-[#C4A882] hover:shadow-md lg:h-[356px]"
          style={{ maxWidth: 392 }}
        >
          <div className="flex flex-1 flex-col overflow-hidden px-5 pb-4 pt-8 text-left">
            <div className="min-h-[56px] w-full overflow-hidden lg:min-h-[60px]">
              <h3
                className="line-clamp-3 text-[15px] font-medium leading-snug text-[#1A1A1A]"
                style={{ fontFamily: 'var(--font-muller)' }}
              >
                {course.title}
              </h3>
            </div>

            {course.imageUrl && (
              <div className="pointer-events-none relative mx-auto mt-3 h-[210px] w-[264px] max-w-[264px] lg:h-[252px] lg:w-[312px] lg:max-w-[312px]">
                <Image
                  src={course.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 264px, 312px"
                  className="scale-[1.14] object-contain"
                />
              </div>
            )}
          </div>

          <div className="border-t border-[#EBEBEB]" />

          <div className="space-y-2.5 px-5 py-4">
            <div className="flex flex-wrap gap-1.5">
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
              <div key={i} className="flex items-center justify-between">
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
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(null)
  const filtersWrapRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const filterButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [filtersVisible, setFiltersVisible] = useState(false)
  const searchParams = useSearchParams()
  const rawSearchQuery = searchParams.get('search')?.trim() ?? ''
  const normalizedSearchQuery = rawSearchQuery.toLowerCase()

  useEffect(() => {
    const el = filtersRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFiltersVisible(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function showFilterTooltip(filter: string) {
    const wrapper = filtersWrapRef.current
    const button = filterButtonRefs.current[filter]
    if (!wrapper || !button) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()

    setHoveredFilter(filter)
    setTooltipPosition({
      left: buttonRect.left - wrapperRect.left + buttonRect.width / 2,
      top: buttonRect.bottom - wrapperRect.top + 12,
    })
  }

  function hideFilterTooltip(filter: string) {
    setHoveredFilter(current => (current === filter ? null : current))
    setTooltipPosition(null)
  }

  const displayedCourses = normalizedSearchQuery
    ? GOAL_COURSES.filter(course => {
        const haystack = [course.title, course.badges.join(' '), ...course.options.map(option => option.duration)]
          .join(' ')
          .toLowerCase()

        return haystack.includes(normalizedSearchQuery)
      })
    : GOAL_COURSES

  const firstRow = displayedCourses.slice(0, 3)
  const secondRow = displayedCourses.slice(3)

  return (
    <section className="section-py bg-[#F4F3EF]">
      <div className="container-site">
        <div className="mb-10">
          <h2 className="mb-8 text-balance font-serif text-4xl text-[#2E1700] md:text-5xl">
            {title}
          </h2>
          {rawSearchQuery && (
            <p className="text-sm text-[#5B3E2B]">
              Результаты по запросу: {rawSearchQuery}
            </p>
          )}
        </div>

        <div ref={filtersWrapRef} className="relative mb-10">
          <div
            ref={filtersRef}
            className={cn(
              'flex gap-2 overflow-x-auto overflow-y-visible pt-[40px] pb-16 scrollbar-hide transition-all duration-700 ease-out md:flex-wrap md:pb-6',
              filtersVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-5 opacity-0 blur-sm'
            )}
          >
            {filters.map(f => (
              <div
                key={f}
                className="flex-shrink-0"
                onMouseEnter={() => showFilterTooltip(f)}
                onMouseLeave={() => hideFilterTooltip(f)}
              >
                <button
                  ref={node => {
                    filterButtonRefs.current[f] = node
                  }}
                  onClick={() => setActiveFilter(f)}
                  onFocus={() => showFilterTooltip(f)}
                  onBlur={() => hideFilterTooltip(f)}
                  aria-label={f}
                  className={cn(
                    'flex-shrink-0 cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors',
                    activeFilter === f
                      ? 'border-[#5B3E2B] bg-[#5B3E2B] text-[#F4F3EF]'
                      : 'border-[#21160F] bg-transparent text-[#2E1700] hover:border-[#5B3E2B] hover:bg-[#5B3E2B] hover:text-[#F4F3EF]'
                  )}
                >
                  {f}
                </button>
              </div>
            ))}
          </div>

          <div
            className={cn(
              'pointer-events-none absolute z-20 w-[220px] rounded-[10px] border border-[#C4A882] bg-[#F4F3EF] px-3 py-2 text-left text-[13px] leading-snug text-[#2E1700] shadow-[0_10px_30px_rgba(46,23,0,0.12)] transition-all duration-300 ease-out',
              hoveredFilter && tooltipPosition
                ? 'visible translate-x-0 translate-y-0 opacity-100'
                : 'invisible translate-x-2 -translate-y-3 opacity-0'
            )}
            style={
              tooltipPosition
                ? {
                    left: tooltipPosition.left,
                    top: tooltipPosition.top,
                    transform: 'translateX(-50%)',
                  }
                : undefined
            }
            role="tooltip"
          >
            {hoveredFilter ? filterTooltips[hoveredFilter] : ''}
          </div>
        </div>

        {displayedCourses.length > 0 ? (
          <>
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {firstRow.map(course => (
                <GoalCard key={course.id} course={course} animated={false} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {secondRow.map((course, i) => (
                <GoalCard
                  key={course.id}
                  course={course}
                  animated={true}
                  animationDelay={i * 120}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-[16px] border border-[#D8CCBA] bg-white px-6 py-10 text-center text-[#2E1700]">
            По этому запросу пока ничего не найдено.
          </div>
        )}
      </div>
    </section>
  )
}
