'use client'

import { Button } from '@/components/ui/button'
import { markContactDone } from '@/app/actions/admin/contacts'

export function MarkContactDoneButton({ id }: { id: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs border-[#E8DFD0] text-[#6B3A25] hover:bg-[#F5F0E8]"
      onClick={async () => { await markContactDone(id) }}
    >
      Обработано
    </Button>
  )
}
