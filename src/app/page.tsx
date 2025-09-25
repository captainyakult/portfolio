import Hero from '@/components/Hero'
import FeaturedWork from '@/components/FeaturedWork'
import AboutSection from '@/components/AboutSection'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <Hero />
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <AboutSection />
      </section>

      {/* Featured Work Section */}
      <section className="py-20 relative">
        <FeaturedWork />
      </section>
    </div>
  )
}