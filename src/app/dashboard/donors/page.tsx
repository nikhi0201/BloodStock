'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, MapPin } from "lucide-react"

const donors = [
    { id: 1, name: "Alice Smith", bloodGroup: "A+", status: "Available", location: "2.3 km away", lastDonation: "Oct 12, 2025" },
    { id: 2, name: "John Doe", bloodGroup: "O-", status: "Available", location: "1.5 km away", lastDonation: "Sep 5, 2025" },
    { id: 3, name: "Sarah Connor", bloodGroup: "AB+", status: "Unavailable", location: "4.1 km away", lastDonation: "Nov 20, 2025" },
    { id: 4, name: "Mike Johnson", bloodGroup: "B+", status: "Available", location: "0.8 km away", lastDonation: "Aug 15, 2025" },
    { id: 5, name: "Emily Davis", bloodGroup: "O+", status: "Available", location: "3.2 km away", lastDonation: "Jul 30, 2025" },
    { id: 6, name: "Robert Wilson", bloodGroup: "A-", status: "Unavailable", location: "5.0 km away", lastDonation: "Dec 1, 2025" },
]

export default function DonorsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Donors</h2>
                <p className="text-slate-400">View and manage registered donors.</p>
            </div>

            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search donors by name or blood group..." className="pl-10 bg-slate-900 border-slate-800" />
                </div>
                <Button variant="outline" className="border-slate-800 text-slate-400 gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {donors.map((donor, index) => (
                    <motion.div
                        key={donor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                    >
                        <Card className="bg-slate-900 border-slate-800 text-white hover:border-slate-700 transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-slate-800 text-slate-200 font-bold">
                                            {donor.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">{donor.name}</h3>
                                            <span className="text-2xl font-bold text-red-500">{donor.bloodGroup}</span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {donor.location}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">
                                            Last donation: {donor.lastDonation}
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <Badge
                                                variant={donor.status === 'Available' ? 'default' : 'secondary'}
                                                className={donor.status === 'Available' ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700'}
                                            >
                                                {donor.status}
                                            </Badge>
                                            <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 text-xs">
                                                Contact
                                            </Button>
                                        </div>
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
