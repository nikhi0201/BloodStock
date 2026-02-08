'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Droplet, CheckCircle, Clock } from "lucide-react"

const stats = [
    {
        title: "Active Donors",
        value: "142",
        icon: Users,
        desc: "+12 from last week",
        color: "text-blue-500"
    },
    {
        title: "Units Collected",
        value: "86",
        icon: Droplet,
        desc: "Total this month",
        color: "text-red-500"
    },
    {
        title: "Requests Fulfilled",
        value: "94%",
        icon: CheckCircle,
        desc: "Success rate",
        color: "text-green-500"
    },
    {
        title: "Avg Response Time",
        value: "12m",
        icon: Clock,
        desc: "-2m improvement",
        color: "text-yellow-500"
    }
]

export default function StatsCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <Card key={i} className="border-slate-800 bg-slate-900/50 backdrop-blur text-slate-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon size={16} className={stat.color} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-slate-400">
                            {stat.desc}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
