'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, Clock, Users, Droplet } from "lucide-react"

const metrics = [
    { label: "Donations This Month", value: "284", change: "+12.5%", trend: "up", icon: Droplet },
    { label: "New Donors", value: "48", change: "+8.2%", trend: "up", icon: Users },
    { label: "Avg Response Time", value: "11.2m", change: "-2.1m", trend: "down", icon: Clock },
    { label: "Fulfillment Rate", value: "94.2%", change: "+3.1%", trend: "up", icon: Activity },
]

const weeklyData = [
    { day: "Mon", donations: 12, requests: 8 },
    { day: "Tue", donations: 18, requests: 15 },
    { day: "Wed", donations: 15, requests: 12 },
    { day: "Thu", donations: 22, requests: 19 },
    { day: "Fri", donations: 28, requests: 24 },
    { day: "Sat", donations: 20, requests: 16 },
    { day: "Sun", donations: 10, requests: 7 },
]

const maxDonations = Math.max(...weeklyData.map(d => d.donations))

export default function AnalyticsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                <p className="text-slate-400">Track performance metrics and trends.</p>
            </div>

            {/* Metric cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-slate-900 border-slate-800 text-white">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <metric.icon className="h-5 w-5 text-slate-400" />
                                    <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-green-500'}`}>
                                        {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        {metric.change}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="text-2xl font-bold">{metric.value}</p>
                                    <p className="text-xs text-slate-400 mt-1">{metric.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Weekly chart */}
            <Card className="bg-slate-900 border-slate-800 text-white">
                <CardHeader>
                    <CardTitle>Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-4 h-64 px-4">
                        {weeklyData.map((data, index) => (
                            <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex gap-1 items-end" style={{ height: '200px' }}>
                                    <motion.div
                                        className="flex-1 bg-red-500/80 rounded-t"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(data.donations / maxDonations) * 100}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                    />
                                    <motion.div
                                        className="flex-1 bg-blue-500/80 rounded-t"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(data.requests / maxDonations) * 100}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                                    />
                                </div>
                                <span className="text-xs text-slate-400">{data.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-red-500/80" />
                            <span className="text-slate-400">Donations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-500/80" />
                            <span className="text-slate-400">Requests</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
