# Task- 1: Node.js HTTP Server with Logging
Create a simple Node.js HTTP server using the built-in http and fs modules.

## Requirements:
1. The server should listen on port 8000.
2. Handle the following routes using a switch case:
- / → Respond with "This is Home Page"
- /about → Respond with "This is About Page"
- /contact → Respond with "This is Contact Page"
- Any other route → Respond with "404 Page Not Found"
3. For every request, store a log entry in a file named log.txt.
4. Each log entry should include:
- Current timestamp
- Requested URL
- Response message
- (Format example: timestamp | url | response)
5. Use fs.appendFile() to write logs without overwriting existing data.
6. Send the appropriate response to the client using res.end().