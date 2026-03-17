const http = require("http");

const server = http.createServer((req, res) => {
    const name = "Joshua";
    
    // Helper function to send HTML response
    const sendResponse = (statusCode, title, content) => {
        res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
        res.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                        text-align: center;
                        min-width: 400px;
                    }
                    h2 {
                        color: #333;
                        margin-top: 0;
                    }
                    p {
                        color: #666;
                        font-size: 18px;
                        margin: 15px 0;
                    }
                    .nav {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #ddd;
                    }
                    a {
                        display: inline-block;
                        margin: 5px 10px;
                        padding: 10px 20px;
                        background: #667eea;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background 0.3s;
                    }
                    a:hover {
                        background: #764ba2;
                    }
                    .error {
                        color: #d32f2f;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>${title}</h2>
                    ${content}
                    <div class="nav">
                        <strong>Navigation:</strong><br>
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a>
                    </div>
                </div>
            </body>
            </html>
        `);
        res.end();
    };

    // Route handling
    if (req.url === "/") {
        sendResponse(200, "Home", `<p>Hello from ${name}'s Node.js Server</p>`);
    } 
    else if (req.url === "/about") {
        sendResponse(200, "About Page", `<p>This server is created using Node.js</p>`);
    } 
    else if (req.url === "/contact") {
        sendResponse(200, "Contact Page", `<p><strong>Email:</strong> ${name.toLowerCase().replace(" ", "")}@gmail.com</p>`);
    } 
    else {
        sendResponse(404, "404 - Page Not Found", `<p class="error">The page you requested does not exist.</p>`);
    }
});

server.listen(3000, "0.0.0.0", () => {
    console.log("✓ Server running at http://localhost:3000");
    console.log("\n📍 Available Routes:");
    console.log("   http://localhost:3000/          (Home)");
    console.log("   http://localhost:3000/about     (About)");
    console.log("   http://localhost:3000/contact   (Contact)");
    console.log("\n✓ Access from another computer: http://<your-ip>:3000");
});