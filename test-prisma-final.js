
const { PrismaClient } = require('@prisma/client')
console.log('Client loaded type:', typeof PrismaClient)

async function main() {
    try {
        console.log('Instantiating...');
        const prisma = new PrismaClient({
            datasourceUrl: "file:./dev.db"
        })
        console.log('Instance created.');
        const count = await prisma.user.count();
        console.log('Count:', count);
    } catch (e) {
        console.error('ERROR:', e);
    }
}
main();
