'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Droplet, Users, Activity, FileText, Loader2 } from "lucide-react"

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/donor/login")
        }
    }, [status, router])

    if (!mounted || status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="h-8 w-8 text-red-500" />
                </motion.div>
            </div>
        )
    }

    if (!session) return null

    const userName = session.user?.name || "User"
    const userRole = (session.user as any)?.role || "donor"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold tracking-tight"
                >
                    Welcome back, {userName}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400"
                >
                    {userRole === "hospital"
                        ? "Overview of hospital blood inventory and activity."
                        : "Your donor dashboard and activity overview."}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
                <StatsCard
                    title="Total Donations"
                    value="1,284"
                    description="+20.1% from last month"
                    icon={Droplet}
                />
                <StatsCard
                    title="Active Donors"
                    value="342"
                    description="+180 new donors"
                    icon={Users}
                />
                <StatsCard
                    title="Pending Requests"
                    value="12"
                    description="4 urgent requests"
                    icon={Activity}
                />
                <StatsCard
                    title="Inventory Status"
                    value="85%"
                    description="Optimal levels"
                    icon={FileText}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
            >
                <RecentActivity />
                <div className="col-span-4 lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center text-slate-500">
                    <Activity className="h-12 w-12 mb-4 text-slate-600" />
                    <p className="text-lg font-medium">Analytics Dashboard</p>
                    <p className="text-sm text-slate-600 mt-1">Charts and analytics coming soon</p>
                </div>
            </motion.div>
        </motion.div>
    )
}
