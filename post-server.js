const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;
const trimmedPath = path.replace(/^\/+|\/+$/g, '');
const method = req.method.toLowerCase();
// For handling POST data
if (method === 'post' && trimmedPath === 'api/data') {
let body = [];
// Collect data chunks
req.on('data', (chunk) => {
body.push(chunk);
});
// Process complete request body
req.on('end', () => {
    body = Buffer.concat(body).toString();
    // If the body is JSON, parse it
    let parsedBody;
    try {
    parsedBody = JSON.parse(body);
// Set response
res.setHeader('Content-Type', 'application/json');
res.writeHead(201); // 201 Created
res.end(JSON.stringify({
message: 'Data received successfully',
data: parsedBody
}));
} catch (e) {
// Handle invalid JSON
res.writeHead(400); // 400 Bad Request
res.end('Invalid JSON payload\n');
}
});
} else {
    // Handle other routes (from the previous example)
    res.setHeader('Content-Type', 'text/plain');
    if (trimmedPath === '') {
    res.writeHead(200);
    res.end('Welcome to the Home Page\n');
    } else if (trimmedPath === 'about') {
        res.writeHead(200);
        res.end('About Us: We are learning to build web servers!\n');
        } else {
        res.writeHead(404);
        res.end('404 - Not Found\n');
        }
        }
        });
        server.listen(3000, () => {
        console.log('Server running at http://localhost:3000/');
});