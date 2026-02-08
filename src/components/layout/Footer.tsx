'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Droplet, Heart } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-slate-950 py-12 text-slate-400">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                            <Droplet className="h-5 w-5 text-red-500" />
                            The Bloodstock
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Emergency Blood Availability Tracking Platform. Connecting donors with hospitals in real-time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* For Users */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Get Started</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/donor/signup" className="hover:text-white transition-colors">Register as Donor</Link></li>
                            <li><Link href="/hospital/signup" className="hover:text-white transition-colors">Register Hospital</Link></li>
                            <li><Link href="/donor/login" className="hover:text-white transition-colors">Donor Login</Link></li>
                            <li><Link href="/hospital/login" className="hover:text-white transition-colors">Hospital Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Emergency</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            For immediate blood emergencies, contact your nearest hospital or call emergency services.
                        </p>
                        <p className="mt-3 text-red-500 font-bold text-lg">📞 108</p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        &copy; 2026 The Bloodstock. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                        Made with <Heart className="h-3.5 w-3.5 text-red-500 inline" /> for saving lives
                    </p>
                </div>
            </div>
        </footer>
    )
}
