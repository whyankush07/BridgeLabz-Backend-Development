const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const timestamp = new Date().toISOString();
    let responseMessage = '';

    switch (url) {
        case '/':
            responseMessage = 'This is Home Page';
            break;
        
        case '/about':
            responseMessage = 'This is About Page';
            break;
        
        case '/contact':
            responseMessage = 'This is Contact Page';
            break;
        
        default:
            responseMessage = '404 Page Not Found';
            break;
    }

    // Log the request
    const logEntry = `${timestamp} | ${url} | ${responseMessage}\n`;
    console.log(logEntry.trim());
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Error writing log:', err.message);
        }
    });

    // Send response
    res.end(responseMessage);
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Logging requests to log.txt');
});
