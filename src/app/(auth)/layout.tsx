"use client"

import { motion } from "framer-motion"

function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
    return (
        <motion.div
            className="absolute rounded-full bg-red-500/20"
            style={{ left: x, top: y, width: size, height: size }}
            animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
        />
    )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        delay: i * 0.3,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: 4 + Math.random() * 8,
    }))

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950" />
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-600/5 blur-[128px]"
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-[128px]"
                    animate={{
                        x: [0, -50, 50, 0],
                        y: [0, 50, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Floating particles */}
            {particles.map((p, i) => (
                <FloatingParticle key={i} {...p} />
            ))}

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {children}
            </div>
        </div>
    )
}
