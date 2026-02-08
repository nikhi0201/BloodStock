'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const bloodInventory = [
    { group: "A+", units: 45, capacity: 60, status: "Good" },
    { group: "A-", units: 12, capacity: 30, status: "Low" },
    { group: "B+", units: 38, capacity: 50, status: "Good" },
    { group: "B-", units: 8, capacity: 25, status: "Critical" },
    { group: "AB+", units: 22, capacity: 30, status: "Good" },
    { group: "AB-", units: 5, capacity: 20, status: "Critical" },
    { group: "O+", units: 52, capacity: 70, status: "Good" },
    { group: "O-", units: 15, capacity: 40, status: "Low" },
]

function getStatusColor(status: string) {
    switch (status) {
        case "Good": return "bg-green-600"
        case "Low": return "bg-yellow-600"
        case "Critical": return "bg-red-600"
        default: return "bg-slate-600"
    }
}

function getBarColor(status: string) {
    switch (status) {
        case "Good": return "bg-green-500"
        case "Low": return "bg-yellow-500"
        case "Critical": return "bg-red-500"
        default: return "bg-slate-500"
    }
}

export default function InventoryPage() {
    const totalUnits = bloodInventory.reduce((sum, item) => sum + item.units, 0)
    const totalCapacity = bloodInventory.reduce((sum, item) => sum + item.capacity, 0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Blood Inventory</h2>
                <p className="text-slate-400">Monitor blood stock levels across all blood groups.</p>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardContent className="p-6 text-center">
                        <p className="text-sm text-slate-400">Total Units</p>
                        <p className="text-4xl font-bold mt-2">{totalUnits}</p>
                        <p className="text-xs text-slate-500 mt-1">of {totalCapacity} capacity</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardContent className="p-6 text-center">
                        <p className="text-sm text-slate-400">Overall Level</p>
                        <p className="text-4xl font-bold mt-2 text-green-500">{Math.round((totalUnits / totalCapacity) * 100)}%</p>
                        <p className="text-xs text-slate-500 mt-1">Capacity utilization</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardContent className="p-6 text-center">
                        <p className="text-sm text-slate-400">Critical Groups</p>
                        <p className="text-4xl font-bold mt-2 text-red-500">{bloodInventory.filter(i => i.status === "Critical").length}</p>
                        <p className="text-xs text-slate-500 mt-1">Need immediate restocking</p>
                    </CardContent>
                </Card>
            </div>

            {/* Blood group cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {bloodInventory.map((item, index) => (
                    <motion.div
                        key={item.group}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                    >
                        <Card className="bg-slate-900 border-slate-800 text-white hover:border-slate-700 transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl font-bold text-red-500">{item.group}</span>
                                    <Badge className={`${getStatusColor(item.status)} text-white`}>
                                        {item.status}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400">Units Available</span>
                                        <span className="font-medium">{item.units} / {item.capacity}</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2.5">
                                        <motion.div
                                            className={`h-2.5 rounded-full ${getBarColor(item.status)}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.units / item.capacity) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
