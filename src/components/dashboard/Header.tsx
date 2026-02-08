"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"

export function Header() {
    const { data: session } = useSession()
    const initials = session?.user?.name
        ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'U'

    return (
        <div className="flex items-center p-4 border-b border-gray-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex w-full items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 bg-slate-900/50 border-slate-800 text-sm h-9"
                    />
                </div>

                <div className="flex ml-auto items-center gap-x-4">
                    <Button size="icon" variant="ghost" className="text-gray-400 relative hover:text-white">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://avatar.vercel.sh/${session?.user?.email}`} />
                            <AvatarFallback className="bg-slate-800 text-xs">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-white">{session?.user?.name || 'User'}</p>
                            <p className="text-xs text-slate-500">{(session?.user as any)?.role || 'member'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
