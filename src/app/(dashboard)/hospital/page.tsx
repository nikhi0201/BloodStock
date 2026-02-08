'use client'

import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'
import { toast } from "sonner"
import MapboxMap from "@/components/map/MapboxMap"
import MapMarker from "@/components/map/MapMarker"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Siren, Table as TableIcon, Map as MapIcon } from "lucide-react"
import RequestTable from "@/components/dashboard/RequestTable"
import StatsCards from "@/components/dashboard/StatsCards"

export default function HospitalDashboard() {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map')

    useEffect(() => {
        socket.connect()
        return () => {
            socket.disconnect()
        }
    }, [])

    const sendAlert = () => {
        const alertData = {
            message: "Urgent O- Blood Needed",
            hospital: "City General Hospital",
            lat: 12.9716,
            lng: 77.5946,
            timestamp: new Date().toISOString()
        }
        socket.emit("alert", alertData)
        toast.success("Emergency Alert Broadcasted to nearby donors")
    }

    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-950 flex flex-col">
            {/* Top Bar / Controls */}
            <div className="z-20 border-b border-slate-800 bg-slate-950 p-4 flex items-center justify-between shadow-md">
                <h1 className="text-xl font-bold text-white">Dashboard Overview</h1>
                <div className="flex gap-4">
                    <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`${viewMode === 'map' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                            onClick={() => setViewMode('map')}
                        >
                            <MapIcon size={16} className="mr-2" /> Map View
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <TableIcon size={16} className="mr-2" /> List View
                        </Button>
                    </div>
                    <Button onClick={sendAlert} variant="destructive" className="gap-2 shadow-red-900/50 shadow-lg animate-pulse font-bold">
                        <Siren size={18} /> BROADCAST ALERT
                    </Button>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                {viewMode === 'map' && (
                    <>
                        <div className="absolute inset-0 z-0 text-black">
                            <MapboxMap initialZoom={13} initialLat={12.9716} initialLng={77.5946}>
                                <MapMarker lat={12.9716} lng={77.5946} type="hospital" />
                                <MapMarker lat={12.98} lng={77.6} type="donor" bloodGroup="A+" />
                                <MapMarker lat={12.96} lng={77.58} type="donor" bloodGroup="O-" />
                            </MapboxMap>
                        </div>

                        {/* Overlay Panel for Map */}
                        <div className="pointer-events-none absolute inset-0 z-10 p-6 flex flex-col justify-end items-start">
                            <Card className="w-80 border-slate-800 bg-slate-950/90 backdrop-blur text-slate-100 shadow-xl pointer-events-auto">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold">Quick Search</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2">
                                        <Input placeholder="Location..." className="bg-slate-900 border-slate-700 h-8 text-xs" />
                                        <Button size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white">
                                            <Search size={14} />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}

                {viewMode === 'list' && (
                    <div className="h-full overflow-auto p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <StatsCards />
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <RequestTable />
                            </div>
                            <div className="space-y-6">
                                <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-slate-100 h-full">
                                    <CardHeader>
                                        <CardTitle>System Health</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-400">Server Status</span>
                                                <span className="text-green-500 text-sm font-bold">Online</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-400">Database Latency</span>
                                                <span className="text-slate-200 text-sm">24ms</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-400">Active Nodes</span>
                                                <span className="text-slate-200 text-sm">3</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
