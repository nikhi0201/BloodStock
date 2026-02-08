const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testRouteLogic() {
    try {
        console.log("Starting route logic check...");

        const email = "test_route@example.com";
        const password = "password123";
        const role = "hospital";

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log("User already exists (expected or not)");
        } else {
            console.log("User does not exist, creating...");
            const hashedPassword = await bcrypt.hash(password, 12);
            console.log("Password hashed.");

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                    hospitalName: "Test Hospital",
                    licenseId: "LIC-ROUTE",
                    address: "123 Route St"
                }
            });
            console.log("User created:", user.id);
        }

    } catch (e) {
        console.error("Route Logic Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

testRouteLogic();
