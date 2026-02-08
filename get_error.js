// using global fetch

async function getFullErrorHTML() {
    try {
        const res = await fetch("http://localhost:3000/api/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ test: "data" })
        });

        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Full HTML response:");
        console.log(text);

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

getFullErrorHTML();
