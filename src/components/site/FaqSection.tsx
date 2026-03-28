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
    <section className="section-py bg-[#F5F0E8]">
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#9B6B4E] uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#3D1F0E] text-balance">
              Часто задаваемые вопросы
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white rounded-xl border border-[#E8DFD0] px-6 data-[state=open]:border-[#C4A882]"
              >
                <AccordionTrigger className="text-left text-[#3D1F0E] font-medium hover:no-underline py-5 [&[data-state=open]>svg]:text-[#6B3A25]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#9B6B4E] leading-relaxed pb-5">
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
