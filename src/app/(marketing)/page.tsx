import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import CTA from '@/components/landing/CTA'

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col bg-slate-950">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  )
}
