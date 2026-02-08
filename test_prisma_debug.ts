import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        const count = await prisma.user.count()
        console.log(`There are ${count} users in the database.`)

        // Attempt to connect and disconnect
        await prisma.$connect()
        console.log("Connected to database successfully")
        await prisma.$disconnect()
    } catch (e) {
        console.error("Prisma Error:", e)
        process.exit(1)
    }
}

main()
