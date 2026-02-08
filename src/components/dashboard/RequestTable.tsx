'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const requests = [
    { id: 1, bloodGroup: "O-", units: 2, status: "Urgent", date: "2 mins ago" },
    { id: 2, bloodGroup: "A+", units: 1, status: "Active", date: "15 mins ago" },
    { id: 3, bloodGroup: "AB+", units: 3, status: "Fulfilled", date: "1 hour ago" },
]

export default function RequestTable() {
    return (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur text-slate-100">
            <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b [&_tr]:border-slate-800">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-slate-400">ID</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-400">Blood Group</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-400">Units</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-400">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-400">Time</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {requests.map((req) => (
                                <tr key={req.id} className="border-b border-slate-800 transition-colors hover:bg-slate-800/50">
                                    <td className="p-4 align-middle font-medium">{req.id}</td>
                                    <td className="p-4 align-middle font-bold text-red-500">{req.bloodGroup}</td>
                                    <td className="p-4 align-middle">{req.units}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={req.status === 'Urgent' ? 'destructive' : req.status === 'Fulfilled' ? 'secondary' : 'default'} className={req.status === 'Active' ? 'bg-green-600 hover:bg-green-700' : ''}>
                                            {req.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle text-slate-400">{req.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
