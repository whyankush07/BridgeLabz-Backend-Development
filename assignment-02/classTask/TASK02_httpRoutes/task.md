# Task - 2: Create an HTTP server using the Node.js http module that runs on port 3000 and handles the following GET routes:


- / → Return a plain text welcome message
- /about → Return a simple HTML response
- /user → Read name and age from query parameters and return a JSON response

## Rules to Follow:


- Set proper Content-Type headers for text, HTML, and JSON
- Use JSON.stringify() when sending JSON data
- Return 404 Page Not Found for invalid routes
- Use only the Node.js http module