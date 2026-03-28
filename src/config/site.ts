export const siteConfig = {
  name: 'Школа психологии',
  description: 'Профессиональное образование в области психологии',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  contacts: {
    phone: '+7 (999) 000-00-00',
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
