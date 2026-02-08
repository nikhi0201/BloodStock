"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { LayoutDashboard, Droplet, Users, FileText, Settings, Activity, LogOut } from "lucide-react"

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Blood Requests",
        icon: Droplet,
        href: "/dashboard/requests",
        color: "text-red-500",
    },
    {
        label: "Donors",
        icon: Users,
        href: "/dashboard/donors",
        color: "text-violet-500",
    },
    {
        label: "Inventory",
        icon: FileText,
        href: "/dashboard/inventory",
        color: "text-orange-500",
    },
    {
        label: "Analytics",
        icon: Activity,
        href: "/dashboard/analytics",
        color: "text-green-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        color: "text-gray-500",
    },
]

export function Sidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" })
    }

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white border-r border-slate-800">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-8 h-8 mr-4"
                    >
                        <Droplet className="h-8 w-8 text-red-600" />
                    </motion.div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        Bloodstock
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route, index) => (
                        <motion.div
                            key={route.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={route.href}
                                className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 ${pathname === route.href ? "text-white bg-white/10 shadow-sm" : "text-zinc-400"
                                    }`}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                                    {route.label}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* User info and logout */}
            <div className="px-3 py-2 border-t border-slate-800">
                {session?.user && (
                    <div className="px-3 py-2 mb-2">
                        <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer text-zinc-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                    <div className="flex items-center flex-1">
                        <LogOut className="h-5 w-5 mr-3 text-red-500" />
                        Logout
                    </div>
                </button>
            </div>
        </div>
    )
}
