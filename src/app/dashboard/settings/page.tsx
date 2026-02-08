'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSession } from "next-auth/react"
import { Bell, Shield, User, Globe } from "lucide-react"

export default function SettingsPage() {
    const { data: session } = useSession()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 max-w-4xl"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-slate-400">Manage your account and preferences.</p>
            </div>

            {/* Profile Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-slate-400" />
                            <CardTitle>Profile</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    defaultValue={session?.user?.name || ""}
                                    className="bg-slate-950 border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    defaultValue={session?.user?.email || ""}
                                    className="bg-slate-950 border-slate-800"
                                    disabled
                                />
                            </div>
                        </div>
                        <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-slate-400" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">Configure how you receive alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Emergency Alerts</Label>
                                <p className="text-xs text-slate-400">Receive urgent blood request notifications.</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-red-500" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Email Notifications</Label>
                                <p className="text-xs text-slate-400">Get updates via email.</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Push Notifications</Label>
                                <p className="text-xs text-slate-400">Browser push notifications for alerts.</p>
                            </div>
                            <Switch className="data-[state=checked]:bg-green-500" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-slate-400" />
                            <CardTitle>Privacy & Security</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">Manage your privacy settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Share Location</Label>
                                <p className="text-xs text-slate-400">Allow hospitals to see your approximate location.</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base">Profile Visibility</Label>
                                <p className="text-xs text-slate-400">Make your profile visible to hospitals.</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                            <Button variant="outline" className="border-red-800 text-red-500 hover:bg-red-500/10">
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}
