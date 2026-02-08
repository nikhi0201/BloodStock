import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Search, Bell, Settings, LogOut } from 'lucide-react'

export default function DashboardSidebar() {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950 p-4">
            <div className="mb-8 flex items-center gap-2 px-2 text-xl font-bold text-white">
                <span>The Bloodstock</span>
            </div>

            <nav className="space-y-2">
                <Link href="/hospital">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:bg-slate-900 hover:text-white">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Button>
                </Link>
                <Link href="/hospital/search">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:bg-slate-900 hover:text-white">
                        <Search size={20} />
                        Find Donors
                    </Button>
                </Link>
                <Link href="/hospital/alerts">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:bg-slate-900 hover:text-white">
                        <Bell size={20} />
                        Alerts
                    </Button>
                </Link>
                <Link href="/hospital/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:bg-slate-900 hover:text-white">
                        <Settings size={20} />
                        Settings
                    </Button>
                </Link>
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <Link href="/api/auth/signout">
                    <Button variant="outline" className="w-full gap-2 border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <LogOut size={16} />
                        Logout
                    </Button>
                </Link>
            </div>
        </aside>
    )
}
