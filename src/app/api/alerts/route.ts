import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { hospitalId, bloodGroup, lat, lng, description } = body

        const alert = await prisma.alert.create({
            data: {
                hospitalId,
                bloodGroup,
                lat,
                lng,
                description,
                status: 'active'
            }
        })

        return NextResponse.json(alert)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create alert' }, { status: 400 })
    }
}

export async function GET(req: Request) {
    try {
        const alerts = await prisma.alert.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                hospital: {
                    select: {
                        hospitalName: true,
                        address: true
                    }
                }
            }
        })
        return NextResponse.json(alerts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 })
    }
}
