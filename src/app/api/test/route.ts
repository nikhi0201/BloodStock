
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        console.log("Dynamically importing lib/prisma...")
        const { prisma } = await import('@/lib/prisma')
        console.log("Prisma imported.", !!prisma)

        const count = await prisma.user.count()
        return NextResponse.json({ message: "Success", count })
    } catch (e: any) {
        console.error("Dynamic Import Error:", e)
        return NextResponse.json({
            error: "Import Failed",
            message: e.message,
            stack: e.stack
        }, { status: 200 }) // Return 200 to see the error in browser/curl
    }
}
