'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'

export default function CTA() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative py-24 overflow-hidden bg-slate-950">
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-slate-950 to-red-900/20" />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[128px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex mb-6"
                    >
                        <Heart className="h-12 w-12 text-red-500" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Every Drop{" "}
                        <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                            Counts
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Join thousands of donors and hospitals already using The Bloodstock to save lives every day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/donor/signup">
                            <Button size="lg" className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-10 py-6 text-lg font-semibold text-white shadow-lg shadow-red-900/50 hover:shadow-red-900/70 transition-all hover:scale-105 group">
                                Become a Donor
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/hospital/signup">
                            <Button variant="outline" size="lg" className="rounded-full border-slate-600 px-10 py-6 text-lg font-semibold text-white hover:bg-slate-800 transition-all hover:scale-105">
                                Register Hospital
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
