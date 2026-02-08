// using global fetch

async function testSimpleRoute() {
    try {
        const res = await fetch("http://localhost:3000/api/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ test: "data" })
        });

        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Body:", text.substring(0, 500));

        try {
            const data = JSON.parse(text);
            console.log("✓ Body is valid JSON:", data);
        } catch (e) {
            console.log("✗ Body is NOT valid JSON");
        }

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testSimpleRoute();
