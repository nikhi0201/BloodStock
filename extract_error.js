// using global fetch
const fs = require('fs');

async function getDetailedError() {
    try {
        const res = await fetch("http://localhost:3000/api/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ test: "data" })
        });

        const html = await res.text();

        // Try to extract error from HTML
        const titleMatch = html.match(/\u003ctitle\u003e([^\u003c]+)\u003c\/title\u003e/);
        const h1Match = html.match(/\u003ch1[^\u003e]*\u003e([^\u003c]+)\u003c\/h1\u003e/);
        const h2Match = html.match(/\u003ch2[^\u003e]*\u003e([^\u003c]+)\u003c\/h2\u003e/);

        console.log("Title:", titleMatch ? titleMatch[1] : "Not found");
        console.log("H1:", h1Match ? h1Match[1] : "Not found");
        console.log("H2:", h2Match ? h2Match[1] : "Not found");

        // Look for common error patterns
        const patterns = [
            /Error:\s*([^\n\u003c]+)/i,
            /FATAL[:\s]+([^\n\u003c]+)/i,
            /Cannot\s+([^\n\u003c]+)/i,
            /Failed\s+([^\n\u003c]+)/i,
            /os error\s+(\d+)/i
        ];

        patterns.forEach((pattern, i) => {
            const match = html.match(pattern);
            if (match) {
                console.log(`Pattern ${i} matched:`, match[0]);
            }
        });

        // Extract visible text content between body tags
        const bodyMatch = html.match(/\u003cbody[^\u003e]*\u003e([\s\S]*?)\u003c\/body\u003e/);
        if (bodyMatch) {
            const bodyContent = bodyMatch[1].replace(/\u003cscript[\s\S]*?\u003c\/script\u003e/g, '').replace(/\u003c[^\u003e]+\u003e/g, ' ').replace(/\s+/g, ' ').substring(0, 500);
            console.log("\nBody text preview:", bodyContent);
        }

        fs.writeFileSync('full_error.html', html);
        console.log("\nFull HTML saved to full_error.html");

    } catch (error) {
        console.error("Fetch error:", error);
    }
}

getDetailedError();
