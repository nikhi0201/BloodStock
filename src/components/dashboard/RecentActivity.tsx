import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
    const activities = [
        {
            user: "Alice Smith",
            action: "donated blood",
            time: "2 hours ago",
            amount: "450ml",
            type: "A+"
        },
        {
            user: "City Hospital",
            action: "requested blood",
            time: "4 hours ago",
            amount: "2 units",
            type: "O-"
        },
        {
            user: "John Doe",
            action: "registered as donor",
            time: "5 hours ago",
            location: "New York"
        },
        {
            user: "Sarah Connor",
            action: "completed donation",
            time: "1 day ago",
            amount: "450ml",
            type: "AB+"
        }
    ]

    return (
        <Card className="bg-slate-900 border-slate-800 text-white col-span-4 lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`https://avatar.vercel.sh/${activity.user}`} alt="Avatar" />
                                <AvatarFallback>{activity.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{activity.user}</p>
                                <p className="text-xs text-slate-500">
                                    {activity.action} - {activity.type || activity.location}
                                </p>
                            </div>
                            <div className="ml-auto font-medium text-xs text-slate-500">
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
