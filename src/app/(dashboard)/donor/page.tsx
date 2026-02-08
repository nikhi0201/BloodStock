'use client'

import { useEffect } from 'react'
import { socket } from '@/lib/socket'
import { toast } from "sonner"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DonorDashboard() {
    useEffect(() => {
        socket.connect()

        socket.on("new-alert", (data: any) => {
            toast.error(`EMERGENCY: ${data.message}`, {
                description: `Location: ${data.hospital}`,
                duration: 10000,
                action: {
                    label: "I Can Help",
                    onClick: () => console.log("Responding to alert")
                }
            })
        })

        return () => {
            socket.off("new-alert")
            socket.disconnect()
        }
    }, [])

    return (
        <div className="p-8 space-y-8 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, John</h1>
                    <p className="text-slate-400">Manage your donor profile and availability.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full text-green-500 border border-green-500/20">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium">Available to Donate</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Profile Card */}
                <Card className="border-slate-800 bg-slate-900 text-slate-100">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback className="bg-slate-800 text-slate-200">JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>John Doe</CardTitle>
                            <CardDescription className="text-slate-400">Blood Group: <span className="text-red-500 font-bold text-lg">O-</span></CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Availability Status</Label>
                                    <p className="text-xs text-slate-400">Turn off if you are unwell or traveling.</p>
                                </div>
                                <Switch checked={true} className="data-[state=checked]:bg-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="border-slate-800 bg-slate-900 text-slate-100">
                    <CardHeader>
                        <CardTitle>Donation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-4">
                            <div className="text-4xl font-bold text-blue-500">3</div>
                            <p className="text-sm text-slate-400 mt-2">Lives Saved</p>
                        </div>
                        <div className="mt-4 text-sm border-t border-slate-800 pt-4">
                            <p className="flex justify-between">
                                <span>Last Donation:</span>
                                <span className="text-slate-300">Oct 12, 2025</span>
                            </p>
                            <p className="flex justify-between mt-2">
                                <span>Next Eligible:</span>
                                <span className="text-green-400">Jan 12, 2026</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Alerts Card */}
                <Card className="border-slate-800 bg-slate-900 text-slate-100 lg:col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Alerts</CardTitle>
                        <CardDescription className="text-slate-400">Emergency requests near you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 rounded-lg border border-red-900/50 bg-red-950/20">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-red-400">Urgent: O- Needed</h4>
                                        <p className="text-xs text-slate-400">City General Hospital • 2.5km away</p>
                                    </div>
                                    <span className="text-xs text-slate-500">2h ago</span>
                                </div>
                                <Button size="sm" className="w-full mt-3 bg-red-600 hover:bg-red-700">Respond</Button>
                            </div>
                            <div className="text-center text-sm text-slate-500 pt-2">
                                No other active alerts.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
