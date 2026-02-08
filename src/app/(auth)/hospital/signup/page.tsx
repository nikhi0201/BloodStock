"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Building2, ArrowRight, Loader2 } from "lucide-react"

export default function HospitalSignup() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        hospitalName: "",
        licenseId: "",
        email: "",
        address: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.hospitalName,
                    role: "hospital",
                    hospitalName: formData.hospitalName,
                    licenseId: formData.licenseId,
                    address: formData.address
                })
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Failed to register")
            }

            toast.success("Hospital registered successfully! Please login.")
            router.push("/hospital/login")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
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
                        Register Hospital
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Create an account to access the emergency network.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4"
                        >
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="hospitalName">Hospital Name</Label>
                                <Input
                                    id="hospitalName"
                                    placeholder="City General Hospital"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="licenseId">License / Registration ID</Label>
                                <Input
                                    id="licenseId"
                                    placeholder="LIC-123456"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300"
                                    value={formData.licenseId}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="email">Official Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@hospital.com"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    placeholder="123 Medical Drive"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 transition-all duration-300"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                        </motion.div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-900/50 group"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Register Facility
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                        <div className="text-center text-sm text-slate-400">
                            Already registered?{" "}
                            <Link href="/hospital/login" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    )
}
