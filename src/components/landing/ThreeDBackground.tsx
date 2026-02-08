"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ThreeDBackground() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-slate-950">
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90" />

            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.2, x: ["0%", "2%", "-2%", "0%"], y: ["0%", "-2%", "2%", "0%"] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                }}
                className="relative h-full w-full"
            >
                <Image
                    src="/blood-cells-bg.png"
                    alt="3D Abstract Blood Cells"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </motion.div>
        </div>
    )
}
