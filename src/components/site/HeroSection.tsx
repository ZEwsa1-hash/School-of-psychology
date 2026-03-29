export function HeroSection() {
  return (
    <section className="bg-[#F4F3EF]">
      <div className="container-site pt-10 pb-8">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-[70px] text-[#2E1700] leading-[1.1] mb-8">
          Академия психологии<br className="hidden sm:block" /> и психотерапии
        </h1>

        <div className="relative w-full h-[361px] rounded-[20px] overflow-hidden bg-[#C8B89A]">
          <img
            src="/assets/hero-image.png"
            alt="Академия психологии и психотерапии"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center -15px' }}
          />
        </div>
      </div>
    </section>
  )
}
