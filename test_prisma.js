const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Connecting...");
        await prisma.$connect();
        console.log("Connected successfully.");

        const count = await prisma.user.count();
        console.log(`User count: ${count}`);

        await prisma.$disconnect();
        console.log("Disconnected.");
    } catch (e) {
        console.error("Error:", e);
    }
}

main();
