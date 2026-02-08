"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Building2, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

export default function HospitalLogin() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                toast.error("Invalid email or password")
            } else {
                toast.success("Logged in successfully!")
                router.push("/dashboard")
                router.refresh()
            }
        } catch (error) {
            toast.error("An error occurred during login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Card className="border-slate-800 bg-slate-900/90 backdrop-blur-xl text-slate-100 shadow-2xl shadow-blue-900/20 overflow-hidden relative">
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 pointer-events-none" />
                
                <CardHeader className="text-center pb-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20"
                    >
                        <Building2 className="h-8 w-8 text-blue-500" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        Hospital Portal
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Login to manage blood requests and search for donors.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                Hospital Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@hospital.com"
                                className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300 focus:border-blue-500/50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-3.5 w-3.5 text-slate-400" />
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300 focus:border-blue-500/50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </motion.div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="w-full"
                        >
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-900/50 group"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Login
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </Button>
                        </motion.div>
                        <div className="text-center text-sm text-slate-400">
                            New Hospital?{" "}
                            <Link href="/hospital/signup" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                                Register your facility
                            </Link>
                        </div>
                        <div className="text-center text-xs text-slate-500">
                            <Link href="/donor/login" className="hover:text-slate-300 hover:underline transition-colors">
                                Are you a Donor? Login here.
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    )
}
