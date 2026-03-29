import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Как записаться на курс?',
    answer: 'Заполните форму на сайте или позвоните нам по телефону. Наш специалист свяжется с вами, ответит на все вопросы и расскажет о процессе зачисления.',
  },
  {
    question: 'Какие документы необходимы для поступления?',
    answer: 'Для зачисления на базовые курсы потребуется только паспорт. Для программ профессиональной переподготовки дополнительно нужен диплом о высшем образовании.',
  },
  {
    question: 'Есть ли рассрочка оплаты?',
    answer: 'Да, мы предлагаем рассрочку на срок до 12 месяцев без переплат. Подробности уточняйте у нашего менеджера при записи.',
  },
  {
    question: 'Как проходит обучение?',
    answer: 'Обучение проходит в смешанном формате: практические занятия очно по выходным дням и теоретические материалы для самостоятельного изучения онлайн. Это позволяет совмещать учёбу с работой.',
  },
  {
    question: 'Выдаётся ли официальный документ об образовании?',
    answer: 'Да, по окончании курса вы получаете документ государственного образца: свидетельство о повышении квалификации или диплом о профессиональной переподготовке — в зависимости от объёма программы.',
  },
]

export function FaqSection() {
  return (
    <section className="section-py bg-[#F3F2EE]">
      <div className="container-site">
        <div className="max-w-[917px] mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-[48px] leading-[100%] tracking-[0%] text-[#2E1700]"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              Часто задаваемые вопросы
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="w-full bg-white rounded-[10px] border-none px-6"
                style={{ boxShadow: '0px 4px 17px 0px #00000040' }}
              >
                <AccordionTrigger
                  className="text-left text-[#2E1700] hover:no-underline min-h-[44px] py-0 leading-[100%] tracking-[0%] data-[state=open]:text-[#000000] data-[state=open]:text-[13px] [&[data-state=open]>svg]:text-[#6B3A25]"
                  style={{ fontFamily: 'var(--font-muller)', fontWeight: 400, fontSize: '16px' }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-[#000000] leading-[100%] pb-4"
                  style={{ fontFamily: 'var(--font-muller)', fontWeight: 400, fontSize: '16px' }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
