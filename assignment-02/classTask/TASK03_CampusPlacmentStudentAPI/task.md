# Task 3: Campus Placement Student API (Most Asked in Interviews)Scenario
Your college placement cell wants a backend system to manage student data during campus drives.

## Requirements
Create a Node.js server that:Uses http module to create serverSupports following APIs:
- GET /students → return all students
- GET /students/:id → return single student
- POST /students → add new student
- DELETE /students/:id → remove student

Store data in-memory (array)
Use JSON response
Handle 404 routes
Log every request to log.txt using fs module