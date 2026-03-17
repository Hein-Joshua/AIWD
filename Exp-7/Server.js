const http = require("http");

const server = http.createServer((req, res) => {
    const name = "Joshua";
    const currentTime = new Date();
    
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Node.js Server</title>
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
                }
                h2 {
                    color: #333;
                    margin: 0 0 20px 0;
                }
                p {
                    color: #666;
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Hello from ${name}'s Node.js Server</h2>
                <p><strong>Current Date and Time:</strong> ${currentTime}</p>
            </div>
        </body>
        </html>
    `);
    res.end();
});

server.listen(3000, "0.0.0.0", () => {
    console.log("✓ Server running at http://localhost:3000");
    console.log("✓ Access from another computer: http://<your-ip>:3000");
});