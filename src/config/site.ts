export const siteConfig = {
  name: 'Школа психологии',
  description: 'Профессиональное образование в области психологии',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  contacts: {
    phone: '+ 375 29 987 65 43',
    email: 'info@school-psychology.ru',
    address: 'г. Москва, ул. Примерная, д. 1',
  },
  nav: [
    { label: 'Главная', href: '/' },
    { label: 'Курсы', href: '/courses' },
    { label: 'Преподаватели', href: '/teachers' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '/contact' },
  ],
}
