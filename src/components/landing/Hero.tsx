'use client'

import VeinFlowScene from '@/components/3d/VeinFlowScene'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Zap } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center text-white">
            <VeinFlowScene />

            <div className="z-10 max-w-4xl px-4">
                {/* Animated badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-400"
                >
                    <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Zap className="h-3.5 w-3.5" />
                    </motion.span>
                    Real-Time Emergency Blood Network
                </motion.div>

                {/* Main heading with staggered animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl"
                >
                    <span className="drop-shadow-lg">The </span>
                    <motion.span
                        className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        Bloodstock
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8 text-xl text-slate-300 sm:text-2xl drop-shadow-md"
                >
                    Track Nearby Blood Availability in Real-Time.
                    <br />
                    <span className="text-slate-400">Instant Donors. Rapid Response. Zero Delays.</span>
                </motion.p>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-10 flex items-center justify-center gap-8 text-sm text-slate-400"
                >
                    <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span><strong className="text-white">1,200+</strong> Lives Saved</span>
                    </div>
                    <div className="h-4 w-px bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <span><strong className="text-white">500+</strong> Active Donors</span>
                    </div>
                    <div className="h-4 w-px bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <span><strong className="text-white">&lt;12min</strong> Avg Response</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                >
                    <Link href="/hospital/login">
                        <Button size="lg" className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-lg font-semibold text-white transition-all hover:from-red-700 hover:to-red-800 shadow-red-900/50 shadow-lg hover:shadow-red-900/70 hover:scale-105 group">
                            Find Blood Now
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link href="/donor/signup">
                        <Button variant="outline" size="lg" className="rounded-full border-slate-600 bg-slate-900/50 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-white shadow-lg hover:scale-105 hover:border-slate-500">
                            Register as Donor
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-center gap-2 text-slate-500 text-xs">
                    <span>Scroll to explore</span>
                    <div className="h-8 w-5 rounded-full border border-slate-600 flex items-start justify-center p-1">
                        <motion.div
                            className="h-1.5 w-1.5 rounded-full bg-slate-400"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
