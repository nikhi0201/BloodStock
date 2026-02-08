import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(req: Request) {
    try {
        console.log("API: POST /api/users started")
        const body = await req.json()
        const { email, password, role, ...other } = body

        if (!email || !password || !role) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
        }

        // Validate role
        if (!['donor', 'hospital', 'admin'].includes(role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
        }

        const hashedPassword = await hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                ...other
            }
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword, { status: 201 })
    } catch (error: any) {
        console.error("API Error:", error)

        // Handle Prisma unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
        }

        return NextResponse.json({
            error: 'Internal Server Error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')

    try {
        const users = await prisma.user.findMany({
            where: role ? { role } : undefined,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                bloodGroup: true,
                lat: true,
                lng: true,
                isAvailable: true,
                hospitalName: true,
                address: true,
                createdAt: true,
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}
