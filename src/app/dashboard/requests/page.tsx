'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter } from "lucide-react"

const requests = [
    { id: 1, bloodGroup: "O-", units: 2, status: "Urgent", hospital: "City General Hospital", date: "2 mins ago", patient: "Emergency Ward" },
    { id: 2, bloodGroup: "A+", units: 1, status: "Active", hospital: "St. Mary's Hospital", date: "15 mins ago", patient: "Surgery Dept" },
    { id: 3, bloodGroup: "AB+", units: 3, status: "Fulfilled", hospital: "Metro Hospital", date: "1 hour ago", patient: "ICU" },
    { id: 4, bloodGroup: "B-", units: 1, status: "Active", hospital: "City General Hospital", date: "2 hours ago", patient: "Trauma Center" },
    { id: 5, bloodGroup: "O+", units: 4, status: "Urgent", hospital: "Children's Hospital", date: "3 hours ago", patient: "Pediatric Ward" },
    { id: 6, bloodGroup: "A-", units: 2, status: "Fulfilled", hospital: "University Hospital", date: "5 hours ago", patient: "Oncology" },
]

export default function RequestsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blood Requests</h2>
                    <p className="text-slate-400">Manage and track all blood requests.</p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 gap-2">
                    <Plus className="h-4 w-4" />
                    New Request
                </Button>
            </div>

            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search requests..." className="pl-10 bg-slate-900 border-slate-800" />
                </div>
                <Button variant="outline" className="border-slate-800 text-slate-400 gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <Card className="bg-slate-900 border-slate-800 text-white">
                <CardHeader>
                    <CardTitle>All Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">ID</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">Blood Group</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">Units</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">Hospital</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">Department</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-400">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, index) => (
                                    <motion.tr
                                        key={req.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-800 transition-colors hover:bg-slate-800/50"
                                    >
                                        <td className="p-4 align-middle font-medium">#{req.id}</td>
                                        <td className="p-4 align-middle font-bold text-red-500">{req.bloodGroup}</td>
                                        <td className="p-4 align-middle">{req.units}</td>
                                        <td className="p-4 align-middle text-slate-300">{req.hospital}</td>
                                        <td className="p-4 align-middle text-slate-400">{req.patient}</td>
                                        <td className="p-4 align-middle">
                                            <Badge
                                                variant={req.status === 'Urgent' ? 'destructive' : req.status === 'Fulfilled' ? 'secondary' : 'default'}
                                                className={req.status === 'Active' ? 'bg-green-600 hover:bg-green-700' : ''}
                                            >
                                                {req.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-slate-400">{req.date}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
