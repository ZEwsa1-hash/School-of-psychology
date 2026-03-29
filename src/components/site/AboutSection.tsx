import Image from 'next/image'

export function AboutSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-site">

        {/* ── Desktop: 3 cols × 3 rows ── */}
        <div
          className="hidden lg:grid gap-x-10"
          style={{
            gridTemplateColumns: '362px 1fr 362px',
            gridTemplateRows: 'auto auto auto',
            rowGap: '32px',
          }}
        >
          {/* [col 1, row 1] Left photo 362×365 */}
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{ gridColumn: 1, gridRow: 1, height: 365 }}
          >
            <Image
              src="/assets/about-building.png"
              alt="Кафедра психологии"
              fill
              sizes="362px"
              className="object-cover"
            />
          </div>

          {/* [col 2, row 1] О нас */}
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <h2 className="font-serif text-4xl text-[#2E1700] mb-6">О нас</h2>
            <div className="space-y-4 text-[#2E1700] text-base leading-relaxed text-justify">
              <p>
                Мы&nbsp;&mdash; академия психологии, где знания сочетаются с практикой и реальными
                инструментами для жизни.
              </p>
              <p>
                Наша цель не просто дать теорию, а <strong>помочь вам</strong> лучше понять себя,
                научиться <strong>работать с людьми</strong> и применять психологию в повседневной
                жизни и карьере.
              </p>
              <p>
                Мы создаём комфортную и поддерживающую среду, в которой можно расти, задавать
                вопросы и постепенно приходить к уверенности в своих знаниях и навыках.
              </p>
            </div>
          </div>

          {/* [col 3, rows 1–3] Right photo 362×576 */}
          <div
            className="relative rounded-[20px] overflow-hidden"
            style={{ gridColumn: 3, gridRow: '1 / 4', height: 576 }}
          >
            <Image
              src="/assets/about-lecture.jpg"
              alt="Лекционный зал"
              fill
              sizes="362px"
              className="object-cover"
            />
          </div>

          {/* [col 1–2, row 2] Почему выбирают нас — heading + divider */}
          <div style={{ gridColumn: '1 / 3', gridRow: 2 }}>
            <h2 className="font-serif text-4xl text-[#2E1700] mb-4">Почему выбирают нас</h2>
            <hr className="border-[#3D1F0E]" />
          </div>

          {/* [col 1, row 3] Много практики */}
          <div style={{ gridColumn: 1, gridRow: 3 }}>
            <h4 className="font-bold text-[#2E1700] mb-2">Много практики</h4>
            <p className="text-sm text-[#2E1700] leading-relaxed text-justify">
              Мы делаем упор на практику, а не на сухую теорию&nbsp;&mdash; вы сразу учитесь
              применять знания в реальных ситуациях.
            </p>
          </div>

          {/* [col 2, row 3] Индивидуальный подход */}
          <div style={{ gridColumn: 2, gridRow: 3 }}>
            <h4 className="font-bold text-[#2E1700] mb-2">Индивидуальный подход</h4>
            <p className="text-sm text-[#2E1700] leading-relaxed text-justify">
              Мы сопровождаем вас на каждом этапе обучения и помогаем прийти к
              результату&nbsp;&mdash; будь то новая профессия или личные изменения.
            </p>
          </div>
        </div>

        {/* ── Mobile: vertical stack ── */}
        <div className="lg:hidden flex flex-col gap-8">
          <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden">
            <Image
              src="/assets/about-building.png"
              alt="Кафедра психологии"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#2E1700] mb-4">О нас</h2>
            <div className="space-y-4 text-[#2E1700] text-base leading-relaxed">
              <p>Мы&nbsp;&mdash; академия психологии, где знания сочетаются с практикой и реальными инструментами для жизни.</p>
              <p>Наша цель не просто дать теорию, а <strong>помочь вам</strong> лучше понять себя, научиться <strong>работать с людьми</strong> и применять психологию в повседневной жизни и карьере.</p>
              <p>Мы создаём комфортную и поддерживающую среду, в которой можно расти, задавать вопросы и постепенно приходить к уверенности в своих знаниях и навыках.</p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-[#2E1700] mb-4">Почему выбирают нас</h2>
            <hr className="border-[#3D1F0E] mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#2E1700] mb-2">Много практики</h4>
                <p className="text-sm text-[#2E1700] leading-relaxed">Мы делаем упор на практику, а не на сухую теорию&nbsp;&mdash; вы сразу учитесь применять знания в реальных ситуациях.</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2E1700] mb-2">Индивидуальный подход</h4>
                <p className="text-sm text-[#2E1700] leading-relaxed">Мы сопровождаем вас на каждом этапе обучения и помогаем прийти к результату&nbsp;&mdash; будь то новая профессия или личные изменения.</p>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden">
            <Image
              src="/assets/about-lecture.jpg"
              alt="Лекционный зал"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
