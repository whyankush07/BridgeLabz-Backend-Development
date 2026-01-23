const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

// In-memory sample student data
let students = [
    { id: 1, name: 'Rahul Sharma', branch: 'CSE', cgpa: 8.5, placed: false },
    { id: 2, name: 'Priya Singh', branch: 'IT', cgpa: 9.2, placed: true },
    { id: 3, name: 'Amit Kumar', branch: 'ECE', cgpa: 7.8, placed: false }
];

let nextId = 4;

function logRequest(method, path) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} | ${method} | ${path}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) console.error('Error writing log:', err.message);
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    logRequest(method, pathname);

    // GET /students - Get all students
    if (method === 'GET' && pathname === '/students') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, data: students }));
    }
    
    // GET /students/:id - Get single student
    else if (method === 'GET' && pathname.startsWith('/students/')) {
        const id = parseInt(pathname.split('/')[2]);
        const student = students.find(s => s.id === id);
        
        res.setHeader('Content-Type', 'application/json');
        if (student) {
            res.end(JSON.stringify({ success: true, data: student }));
        } else {
            res.end(JSON.stringify({ success: false, message: 'Student not found' }));
        }
    }
    
    // POST /students - Add new student
    else if (method === 'POST' && pathname === '/students') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newStudent = JSON.parse(body);
                newStudent.id = nextId++;
                students.push(newStudent);
                
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Student added', data: newStudent }));
            } catch (error) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Invalid JSON data' }));
            }
        });
    }
    
    // DELETE /students/:id - Delete student
    else if (method === 'DELETE' && pathname.startsWith('/students/')) {
        const id = parseInt(pathname.split('/')[2]);
        const initialLength = students.length;
        students = students.filter(s => s.id !== id);
        
        res.setHeader('Content-Type', 'application/json');
        if (students.length < initialLength) {
            res.end(JSON.stringify({ success: true, message: 'Student deleted' }));
        } else {
            res.end(JSON.stringify({ success: false, message: 'Student not found' }));
        }
    }
    
    // 404 - Route not found
    else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: '404 Route Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Campus Placement API running on http://localhost:${PORT}`);
    console.log('\nAvailable endpoints:');
    console.log('  GET    /students       - Get all students');
    console.log('  GET    /students/:id   - Get student by ID');
    console.log('  POST   /students       - Add new student');
    console.log('  DELETE /students/:id   - Delete student');
});
