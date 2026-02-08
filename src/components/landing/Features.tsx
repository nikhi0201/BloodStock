'use client'

import { motion, useInView } from 'framer-motion'
import { MapPin, Bell, Activity, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'

const features = [
    {
        icon: MapPin,
        title: "Real-Time Tracking",
        description: "Locate verified donors within 5km of your hospital instantly using GPS-powered mapping.",
        gradient: "from-red-500 to-orange-500",
        glow: "shadow-red-500/20",
    },
    {
        icon: Bell,
        title: "Instant Alerts",
        description: "Broadcast emergency requests to all nearby eligible donors with one click.",
        gradient: "from-blue-500 to-cyan-500",
        glow: "shadow-blue-500/20",
    },
    {
        icon: ShieldCheck,
        title: "Verified Donors",
        description: "All donors are health-verified to ensure safe and reliable transfusions.",
        gradient: "from-green-500 to-emerald-500",
        glow: "shadow-green-500/20",
    },
    {
        icon: Activity,
        title: "Live Availability",
        description: "Donors toggle their status in real-time, so you only see who is ready to help.",
        gradient: "from-purple-500 to-pink-500",
        glow: "shadow-purple-500/20",
    }
]

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="bg-slate-950 py-24 text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-600/5 blur-[128px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-600/5 blur-[128px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="mb-4 inline-block rounded-full bg-red-500/10 px-4 py-1 text-sm text-red-400 border border-red-500/20">
                            Features
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-4 text-3xl font-bold sm:text-5xl"
                    >
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                            The Bloodstock?
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mx-auto max-w-2xl text-slate-400 text-lg"
                    >
                        Our platform bridges the gap between emergency needs and willing donors using advanced location algorithms.
                    </motion.p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className={`group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl ${feature.glow}`}
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                            >
                                <feature.icon size={24} />
                            </motion.div>
                            <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
