'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Droplet, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white group">
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Droplet className="h-6 w-6 text-red-500 group-hover:text-red-400 transition-colors" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        The Bloodstock
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    {["Home", "About", "Contact"].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                        >
                            <Link
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <Link href="/hospital/login">
                        <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                            Hospital Login
                        </Button>
                    </Link>
                    <Link href="/donor/login">
                        <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-900/30 transition-all hover:shadow-red-900/50">
                            Donor Login
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl"
                >
                    <div className="container mx-auto px-4 py-4 space-y-3">
                        <Link href="/" className="block text-slate-300 hover:text-white py-2" onClick={() => setMobileOpen(false)}>Home</Link>
                        <Link href="/about" className="block text-slate-300 hover:text-white py-2" onClick={() => setMobileOpen(false)}>About</Link>
                        <Link href="/contact" className="block text-slate-300 hover:text-white py-2" onClick={() => setMobileOpen(false)}>Contact</Link>
                        <div className="pt-3 border-t border-white/10 space-y-2">
                            <Link href="/hospital/login" onClick={() => setMobileOpen(false)}>
                                <Button variant="outline" className="w-full border-slate-700 text-slate-300">Hospital Login</Button>
                            </Link>
                            <Link href="/donor/login" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Donor Login</Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    )
}
