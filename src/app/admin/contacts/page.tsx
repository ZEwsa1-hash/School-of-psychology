import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { MarkContactDoneButton } from '@/components/admin/MarkContactDoneButton'

export const metadata: Metadata = { title: 'Обращения — Администратор' }

export default async function AdminContactsPage() {
  const contacts = await prisma.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl text-[#3D1F0E]">Обращения</h1>

      <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
              <tr>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Контакт</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden md:table-cell">Сообщение</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium hidden lg:table-cell">Дата</th>
                <th className="text-left px-4 py-3 text-[#9B6B4E] font-medium">Статус</th>
                <th className="text-right px-4 py-3 text-[#9B6B4E] font-medium">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E8]">
              {contacts.map(c => (
                <tr key={c.id} className={`hover:bg-[#F5F0E8] ${c.status === 'NEW' ? 'bg-[#FFFBF7]' : ''}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-[#3D1F0E]">{c.name}</p>
                    <p className="text-xs text-[#9B6B4E]">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#9B6B4E]">
                    <p className="line-clamp-2 max-w-xs">{c.message || '—'}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#9B6B4E]">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${c.status === 'NEW' ? 'bg-[#F5F0E8] text-[#6B3A25] font-medium' : 'bg-gray-100 text-gray-500'}`}>
                      {c.status === 'NEW' ? 'Новое' : 'Обработано'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {c.status === 'NEW' && <MarkContactDoneButton id={c.id} />}
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[#9B6B4E]">Нет обращений</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
