import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const adminHash = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.ru' },
    update: {},
    create: {
      email: 'admin@school.ru',
      name: 'Администратор',
      passwordHash: adminHash,
      role: UserRole.ADMIN,
    },
  })
  console.log('✅ Admin:', admin.email)

  // Student user
  const studentHash = await bcrypt.hash('student123', 12)
  const student = await prisma.user.upsert({
    where: { email: 'student@school.ru' },
    update: {},
    create: {
      email: 'student@school.ru',
      name: 'Тестовый студент',
      passwordHash: studentHash,
      role: UserRole.STUDENT,
    },
  })
  console.log('✅ Student:', student.email)

  // Teachers (matching Figma design: Ковалева, Лебедева, Соколов, Власова)
  const teachers = await Promise.all([
    prisma.teacher.upsert({
      where: { id: 'teacher-1' },
      update: {},
      create: {
        id: 'teacher-1',
        name: 'Ковалева Наталья',
        bio: 'Кандидат психологических наук, специалист в области когнитивно-поведенческой терапии с более чем 15-летним опытом. Автор практических руководств по работе с тревожными расстройствами.',
        specialization: 'Когнитивно-поведенческая терапия',
        sortOrder: 1,
      },
    }),
    prisma.teacher.upsert({
      where: { id: 'teacher-2' },
      update: {},
      create: {
        id: 'teacher-2',
        name: 'Лебедева Ирина',
        bio: 'Психоаналитик с международной сертификацией. Специализируется на работе с тревожными расстройствами и депрессией. Проводит индивидуальные и групповые сессии.',
        specialization: 'Психоанализ',
        sortOrder: 2,
      },
    }),
    prisma.teacher.upsert({
      where: { id: 'teacher-3' },
      update: {},
      create: {
        id: 'teacher-3',
        name: 'Соколов Дмитрий',
        bio: 'Семейный психолог и системный терапевт. Более 10 лет работает с парами и семьями. Автор популярного курса по детско-родительским отношениям.',
        specialization: 'Семейная терапия',
        sortOrder: 3,
      },
    }),
    prisma.teacher.upsert({
      where: { id: 'teacher-4' },
      update: {},
      create: {
        id: 'teacher-4',
        name: 'Власова Екатерина',
        bio: 'Клинический психолог, специалист по экзистенциальной и гуманистической психологии. Ведёт авторские программы личностного роста и самопознания.',
        specialization: 'Экзистенциальная психология',
        sortOrder: 4,
      },
    }),
  ])
  console.log(`✅ ${teachers.length} teachers created`)

  // Courses
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { slug: 'osnovy-psihologii' },
      update: {},
      create: {
        slug: 'osnovy-psihologii',
        title: 'Основы психологии',
        description: 'Базовый курс для тех, кто хочет понять принципы работы психики, научиться лучше понимать себя и окружающих. Идеально для начинающих.',
        content: `Этот курс создан специально для тех, кто делает первые шаги в изучении психологии.

**Вы научитесь:**
- Понимать основные психологические процессы
- Разбираться в своих эмоциях и реакциях
- Выстраивать здоровые отношения с окружающими
- Применять психологические знания в повседневной жизни

**Программа курса:**
1. Введение в психологию
2. Психические процессы: внимание, память, мышление
3. Эмоции и чувства
4. Личность и её структура
5. Общение и межличностные отношения`,
        price: 2900000,
        duration: '2 месяца',
        published: true,
        teacherId: 'teacher-1',
        sortOrder: 1,
      },
    }),
    prisma.course.upsert({
      where: { slug: 'kognitivno-povedencheskaya-terapiya' },
      update: {},
      create: {
        slug: 'kognitivno-povedencheskaya-terapiya',
        title: 'Когнитивно-поведенческая терапия',
        description: 'Профессиональный курс по КПТ: теория, методы и практические инструменты для работы с клиентами. Включает супервизию и разбор реальных случаев.',
        content: `Глубокое погружение в когнитивно-поведенческую терапию — один из наиболее изученных и эффективных методов психотерапии.

**Для кого этот курс:**
- Практикующих психологов, желающих освоить КПТ
- Специалистов, желающих расширить инструментарий
- Студентов психологических факультетов

**Программа:**
1. Теоретические основы КПТ
2. Когнитивные искажения и работа с ними
3. Поведенческие техники
4. Работа с тревогой и депрессией
5. Схема-терапия: введение
6. Супервизия реальных случаев`,
        price: 5900000,
        duration: '4 месяца',
        published: true,
        teacherId: 'teacher-1',
        sortOrder: 2,
      },
    }),
    prisma.course.upsert({
      where: { slug: 'semeynaya-psihologiya' },
      update: {},
      create: {
        slug: 'semeynaya-psihologiya',
        title: 'Семейная психология',
        description: 'Изучите принципы системной семейной терапии, научитесь работать с парами и детско-родительскими отношениями.',
        content: `Системный подход к работе с семьёй — один из наиболее востребованных навыков в современной психологии.

**Темы курса:**
1. Системная семейная терапия: основы
2. Семья как система
3. Работа с парами
4. Детско-родительские отношения
5. Кризисы в семье и способы их преодоления
6. Практическая работа под супервизией`,
        price: 4900000,
        duration: '3 месяца',
        published: true,
        teacherId: 'teacher-3',
        sortOrder: 3,
      },
    }),
    prisma.course.upsert({
      where: { slug: 'ekzistencialnaya-psihologiya' },
      update: {},
      create: {
        slug: 'ekzistencialnaya-psihologiya',
        title: 'Экзистенциальная психология',
        description: 'Курс о смысле жизни, свободе выбора и личностной ответственности. Философский и практический взгляд на ключевые вопросы человеческого существования.',
        content: `Экзистенциальная психология обращается к фундаментальным вопросам человеческого бытия.

**Что вы изучите:**
- Концепции Виктора Франкла, Ролло Мэя, Ирвина Ялома
- Работа со смыслом и целями жизни
- Принятие свободы и ответственности
- Экзистенциальные кризисы: понимание и помощь`,
        price: 3900000,
        duration: '2 месяца',
        published: true,
        teacherId: 'teacher-4',
        sortOrder: 4,
      },
    }),
  ])
  console.log(`✅ ${courses.length} courses created`)

  // Blog posts
  const posts = await Promise.all([
    prisma.blogPost.upsert({
      where: { slug: 'chto-takoe-kpt' },
      update: {},
      create: {
        slug: 'chto-takoe-kpt',
        title: 'Что такое когнитивно-поведенческая терапия',
        excerpt: 'КПТ — один из наиболее изученных и эффективных методов психотерапии. Разбираемся в его основах и применении.',
        content: `# Что такое когнитивно-поведенческая терапия

Когнитивно-поведенческая терапия (КПТ) — это форма психотерапии, которая фокусируется на связи между мыслями, эмоциями и поведением.

## Основные принципы

КПТ основана на идее, что наши мысли влияют на наши эмоции и поведение. Изменяя негативные паттерны мышления, мы можем улучшить своё эмоциональное состояние.

## Применение

КПТ эффективна при:
- Тревожных расстройствах
- Депрессии
- Фобиях
- Обсессивно-компульсивном расстройстве

## Как проходит терапия

Терапевт и клиент работают вместе над выявлением и изменением дисфункциональных убеждений и поведенческих паттернов.`,
        published: true,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'kak-spravitsya-so-stressom' },
      update: {},
      create: {
        slug: 'kak-spravitsya-so-stressom',
        title: 'Как справиться со стрессом: 5 проверенных техник',
        excerpt: 'Стресс — неотъемлемая часть современной жизни. Психологи поделились техниками, которые действительно работают.',
        content: `# Как справиться со стрессом: 5 проверенных техник

Стресс стал привычной частью нашей жизни. Но это не значит, что с ним нельзя справиться.

## 1. Диафрагмальное дыхание

Глубокое дыхание активирует парасимпатическую нервную систему и снижает уровень кортизола. Практикуйте 5 минут утром.

## 2. Прогрессивная мышечная релаксация

Техника Джекобсона помогает снять физическое напряжение. Поочерёдно напрягайте и расслабляйте группы мышц.

## 3. Когнитивное переструктурирование

Задайте себе вопрос: «Насколько это важно будет через год?» Это помогает снизить интенсивность стрессовой реакции.

## 4. Физическая активность

30 минут умеренной физической нагрузки снижают уровень кортизола и повышают выработку эндорфинов.

## 5. Mindfulness

Практика осознанности помогает оставаться в настоящем моменте, не погружаясь в тревожные мысли о будущем.`,
        published: true,
      },
    }),
    prisma.blogPost.upsert({
      where: { slug: 'psihologiya-otnosheniy' },
      update: {},
      create: {
        slug: 'psihologiya-otnosheniy',
        title: 'Психология здоровых отношений: что важно знать',
        excerpt: 'Здоровые отношения строятся на нескольких ключевых принципах. Разберёмся, что делает союз двух людей по-настоящему крепким.',
        content: `# Психология здоровых отношений

Здоровые отношения — это не случайность, а результат сознательного выбора и работы обоих партнёров.

## Основы здоровых отношений

### 1. Безопасная привязанность
Партнёры чувствуют себя в безопасности, могут быть уязвимыми и доверяют друг другу.

### 2. Уважение к границам
Каждый партнёр сохраняет свою идентичность, интересы и личное пространство.

### 3. Открытая коммуникация
Партнёры говорят о своих потребностях, не прибегая к манипуляциям.

### 4. Совместное решение конфликтов
Разногласия воспринимаются как возможность лучше понять друг друга.`,
        published: true,
      },
    }),
  ])
  console.log(`✅ ${posts.length} blog posts created`)

  // Sample enrollments
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: courses[0].id } },
    update: {},
    create: {
      userId: student.id,
      courseId: courses[0].id,
      status: 'ACTIVE',
    },
  })
  console.log('✅ Sample enrollment created')

  // Sample contact request
  await prisma.contactRequest.create({
    data: {
      name: 'Мария Иванова',
      email: 'maria@example.ru',
      phone: '+7 (900) 123-45-67',
      message: 'Интересует курс по КПТ, хотела бы узнать подробнее.',
      status: 'NEW',
    },
  })
  console.log('✅ Sample contact request created')

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
