// using global fetch


async function testSignup() {
    try {
        const res = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "test@example.com",
                password: "password123",
                role: "hospital",
                name: "Test Hospital",
                hospitalName: "Test Hospital",
                licenseId: "LIC-TEST",
                address: "123 Test St"
            })
        });

        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Body preview:", text.substring(0, 500));

        try {
            JSON.parse(text);
            console.log("Body is valid JSON");
        } catch (e) {
            console.log("Body is NOT valid JSON:", e.message);
        }

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testSignup();
