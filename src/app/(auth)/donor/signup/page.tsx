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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Droplet, UserPlus, ArrowRight } from "lucide-react"

export default function DonorSignup() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        bloodGroup: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, bloodGroup: value })
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
                    name: `${formData.firstName} ${formData.lastName}`,
                    role: "donor",
                    bloodGroup: formData.bloodGroup
                })
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.error || "Failed to register")
            }

            toast.success("Account created successfully! Please login.")
            router.push("/donor/login")
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
            <Card className="border-slate-800 bg-slate-900/90 backdrop-blur-xl text-slate-100 shadow-2xl shadow-red-900/20 overflow-hidden relative">
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 pointer-events-none" />
                
                <CardHeader className="text-center pb-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20"
                    >
                        <UserPlus className="h-8 w-8 text-red-500" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        Join The Bloodstock
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Register as a donor and save lives.
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
                            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        className="bg-slate-950/50 border-slate-800 focus-visible:ring-red-500 transition-all duration-300"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        className="bg-slate-950/50 border-slate-800 focus-visible:ring-red-500 transition-all duration-300"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-red-500 transition-all duration-300"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="bloodGroup">Blood Group</Label>
                                <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger className="bg-slate-950/50 border-slate-800 focus:ring-red-500">
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                                            <SelectItem key={group} value={group}>{group}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="bg-slate-950/50 border-slate-800 focus-visible:ring-red-500 transition-all duration-300"
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
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-900/30 transition-all duration-300 hover:shadow-red-900/50 group"
                            disabled={loading}
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Droplet className="h-4 w-4" />
                                </motion.div>
                            ) : (
                                <>
                                    Register
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                        <div className="text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link href="/donor/login" className="text-red-400 hover:text-red-300 hover:underline transition-colors">
                                Login
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </motion.div>
    )
}
