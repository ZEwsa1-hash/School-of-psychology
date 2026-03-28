'use client'

import { updateEnrollmentStatus } from '@/app/actions/admin/enrollments'

type Status = 'PENDING' | 'ACTIVE' | 'COMPLETED'

const labels: Record<Status, string> = {
  PENDING: 'Ожидает',
  ACTIVE: 'Активен',
  COMPLETED: 'Завершён',
}

export function EnrollmentStatusSelect({ id, status }: { id: string; status: Status }) {
  return (
    <select
      defaultValue={status}
      onChange={async e => {
        await updateEnrollmentStatus(id, e.target.value as Status)
      }}
      className="text-xs rounded-full px-2 py-1 border border-[#E8DFD0] bg-white text-[#3D1F0E] cursor-pointer"
    >
      {Object.entries(labels).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  )
}
