import Image from 'next/image'

export function AboutSection() {
  return (
    <section className="section-py bg-[#F4F3EF]">
      <div className="container-site">
        <div
          className="hidden gap-x-10 lg:grid"
          style={{
            gridTemplateColumns: '362px 1fr 362px',
            gridTemplateRows: 'auto auto auto',
            rowGap: '32px',
          }}
        >
          <div
            className="relative overflow-hidden rounded-[20px]"
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

          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <h2
              className="mb-6 text-4xl text-[#2E1700]"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              О нас
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed text-[#2E1700] text-justify"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              <p>
                Мы — академия психологии, где знания сочетаются с практикой и реальными
                инструментами для жизни.
              </p>
              <p>
                Наша цель не просто дать теорию, а <strong>помочь вам</strong> лучше понять
                себя, научиться <strong>работать с людьми</strong> и применять психологию в
                повседневной жизни и карьере.
              </p>
              <p>
                Мы создаём комфортную и поддерживающую среду, в которой можно расти, задавать
                вопросы и постепенно приходить к уверенности в своих знаниях и навыках.
              </p>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[20px]"
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

          <div style={{ gridColumn: '1 / 3', gridRow: 2 }}>
            <h2
              className="mb-4 text-4xl text-[#2E1700]"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              Почему выбирают нас
            </h2>
            <hr className="border-[#3D1F0E]" />
          </div>

          <div style={{ gridColumn: 1, gridRow: 3, fontFamily: 'var(--font-muller)' }}>
            <h4
              className="mb-2 text-[20px] leading-none text-[#2E1700] text-justify"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 700 }}
            >
              Много практики
            </h4>
            <p className="text-sm leading-relaxed text-[#2E1700] text-justify">
              Мы делаем упор на практику, а не на сухую теорию — вы сразу учитесь применять
              знания в реальных ситуациях.
            </p>
          </div>

          <div style={{ gridColumn: 2, gridRow: 3, fontFamily: 'var(--font-muller)' }}>
            <h4
              className="mb-2 text-[20px] leading-none text-[#2E1700] text-justify"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 700 }}
            >
              Индивидуальный подход
            </h4>
            <p className="text-sm leading-relaxed text-[#2E1700] text-justify">
              Мы сопровождаем вас на каждом этапе обучения и помогаем прийти к результату —
              будь то новая профессия или личные изменения.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:hidden">
          <div className="relative h-[343px] w-full overflow-hidden rounded-[20px]">
            <Image
              src="/assets/about-building.png"
              alt="Кафедра психологии"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2
              className="mb-4 text-2xl text-[#2E1700]"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              О нас
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed text-[#2E1700]"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              <p>
                Мы — академия психологии, где знания сочетаются с практикой и реальными
                инструментами для жизни.
              </p>
              <p>
                Наша цель не просто дать теорию, а <strong>помочь вам</strong> лучше понять
                себя, научиться <strong>работать с людьми</strong> и применять психологию в
                повседневной жизни и карьере.
              </p>
              <p>
                Мы создаём комфортную и поддерживающую среду, в которой можно расти, задавать
                вопросы и постепенно приходить к уверенности в своих знаниях и навыках.
              </p>
            </div>
          </div>

          <div className="relative ml-auto h-[349px] w-[210px] overflow-hidden rounded-[20px]">
            <Image
              src="/assets/about-lecture.jpg"
              alt="Лекционный зал"
              fill
              sizes="210px"
              className="object-cover"
            />
          </div>

          <div>
            <h2
              className="mb-4 text-2xl text-[#2E1700]"
              style={{ fontFamily: 'var(--font-muller)', fontWeight: 400 }}
            >
              Почему выбирают нас
            </h2>
            <hr className="mb-6 border-[#3D1F0E]" />
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              style={{ fontFamily: 'var(--font-muller)' }}
            >
              <div>
                <h4
                  className="mb-2 text-[20px] leading-none text-[#2E1700] text-justify"
                  style={{ fontWeight: 700 }}
                >
                  Много практики
                </h4>
                <p className="text-sm leading-relaxed text-[#2E1700]">
                  Мы делаем упор на практику, а не на сухую теорию — вы сразу учитесь применять
                  знания в реальных ситуациях.
                </p>
              </div>
              <div>
                <h4
                  className="mb-2 text-[20px] leading-none text-[#2E1700] text-justify"
                  style={{ fontWeight: 700 }}
                >
                  Индивидуальный подход
                </h4>
                <p className="text-sm leading-relaxed text-[#2E1700]">
                  Мы сопровождаем вас на каждом этапе обучения и помогаем прийти к результату —
                  будь то новая профессия или личные изменения.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
