'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, MapPin, Zap } from 'lucide-react'

const steps = [
    {
        step: "01",
        title: "Register",
        description: "Donors and Hospitals create verified accounts in under 2 minutes.",
        icon: UserPlus,
        color: "from-red-500 to-red-600",
    },
    {
        step: "02",
        title: "Locate",
        description: "Hospitals view a live map of available donors nearby with real-time GPS.",
        icon: MapPin,
        color: "from-blue-500 to-blue-600",
    },
    {
        step: "03",
        title: "Connect",
        description: "Instant alerts connect hospitals with donors to save lives in minutes.",
        icon: Zap,
        color: "from-green-500 to-green-600",
    }
]

export default function HowItWorks() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="relative overflow-hidden bg-slate-900 py-24 text-white">
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-red-600/5 blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-[128px]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm text-blue-400 border border-blue-500/20">
                        How It Works
                    </span>
                    <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                        Three Simple{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            Steps
                        </span>
                    </h2>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-[2px]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-500/50 via-blue-500/50 to-green-500/50"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </div>

                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Step number circle */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-lg relative z-10`}
                            >
                                <item.icon className="h-10 w-10 text-white" />
                                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 text-xs font-bold text-slate-300">
                                    {item.step}
                                </div>
                            </motion.div>

                            <h3 className="mb-3 text-2xl font-bold text-white">{item.title}</h3>
                            <p className="max-w-xs text-slate-400 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
