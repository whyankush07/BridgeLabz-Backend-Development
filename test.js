// const fs = require("fs");
// const ps = require("fs/promises");

// const data = fs.readFileSync('output.txt', 'utf-8')
// console.log(data)

// // fs.writeFileSync('output.txt', "Hello, i am ankush")
// fs.writeFile('output.txt', "Hello, this is async function", (err, data) => {
//     if (err) throw new Error (err);
//     else console.log(data)
// })

// fs.readFile('output.txt', 'utf-8', (err, data) => {
//     if (err) throw new Error(err);
//     else console.log(data)
// })



// // fs.unlinkSync('output.txt')

// async function main() {
//     await ps.writeFile('output.txt', "Hello, this is async function inside scope")
//     const file = await ps.readFile('output.txt', 'utf-8')
//     console.log(file)
// }

// main()

const http = require('http');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'logs.log');

function logger(url) {
    if (url === "favicon.ico") return;
    const date = new Date().toISOString();
    const message = `[${date}] | ${url}\n`;

    fs.appendFile(dir, message, (err, data) => {
        if (err) console.error("Error writing to log file:", err);
        else console.log(`${message}`);
    })
}

const server = http.createServer((req, res) => {
    const { url } = req;
    logger(url);

    switch (url) {
        case '/':
            res.statusCode = 200;
            res.end("Hello, the request is working fine!!")
            return;
        case '/about':
            res.statusCode = 200;
            res.end("Hello, the request is working fine!!")
            return;
        case '/contact':
            res.statusCode = 200;
            res.end("Hello, the request is working fine!!")
            return;
        default:
            res.statusCode = 404;
            res.end("404");
            return;
    }
})

server.listen(3000, () => {
    console.log("Server is listening on port 3000")
})