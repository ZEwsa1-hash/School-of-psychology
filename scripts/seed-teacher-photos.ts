import { prisma } from '../src/lib/prisma'

const photos: Record<string, string> = {
  'teacher-1': '/teachers/anna-kovaleva.png',    // Ковалева
  'teacher-2': '/teachers/maria-lebedeva.jpg',   // Лебедева
  'teacher-3': '/teachers/dmitry-sokolov.png',   // Соколов
  'teacher-4': '/teachers/elena-vlasova.png',    // Власова
}

async function main() {
  for (const [id, photo] of Object.entries(photos)) {
    await prisma.teacher.update({ where: { id }, data: { photo } })
    console.log(`Updated ${id} → ${photo}`)
  }
  await prisma.$disconnect()
}

main()
