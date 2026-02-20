// Exercise 4: Full CRUD operations for Authors resource

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample authors data
let authors = [
  { id: 1, name: "F. Scott Fitzgerald", nationality: "American", birthYear: 1896 },
  { id: 2, name: "Harper Lee", nationality: "American", birthYear: 1926 },
  { id: 3, name: "George Orwell", nationality: "British", birthYear: 1903 },
  { id: 4, name: "J.D. Salinger", nationality: "American", birthYear: 1919 }
];

// Variable to track the next ID
let nextId = 5;

// GET all authors
app.get('/authors', (req, res) => {
  res.json({
    count: authors.length,
    data: authors
  });
});

// GET single author by id
app.get('/authors/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  res.json(author);
});

// POST - Create a new author
app.post('/authors', (req, res) => {
  const { name, nationality, birthYear } = req.body;
  
  // Validate required fields
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  
  // Validate birthYear if provided
  if (birthYear && (isNaN(birthYear) || birthYear < 1000 || birthYear > new Date().getFullYear())) {
    return res.status(400).json({ error: "Invalid birth year" });
  }
  
  const newAuthor = {
    id: nextId++,
    name,
    nationality: nationality || "Unknown",
    birthYear: birthYear ? parseInt(birthYear) : null
  };
  
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// PUT - Update an existing author (full update)
app.put('/authors/:id', (req, res) => {
  const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
  
  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  const { name, nationality, birthYear } = req.body;
  
  // Validate required fields
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  
  // Validate birthYear if provided
  if (birthYear && (isNaN(birthYear) || birthYear < 1000 || birthYear > new Date().getFullYear())) {
    return res.status(400).json({ error: "Invalid birth year" });
  }
  
  // Update the author (full replacement)
  authors[authorIndex] = {
    id: authors[authorIndex].id,
    name,
    nationality: nationality || "Unknown",
    birthYear: birthYear ? parseInt(birthYear) : null
  };
  
  res.json(authors[authorIndex]);
});

// PATCH - Partially update an existing author
app.patch('/authors/:id', (req, res) => {
  const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
  
  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  const { name, nationality, birthYear } = req.body;
  
  // Validate birthYear if provided
  if (birthYear !== undefined && (isNaN(birthYear) || birthYear < 1000 || birthYear > new Date().getFullYear())) {
    return res.status(400).json({ error: "Invalid birth year" });
  }
  
  // Partially update the author
  if (name) authors[authorIndex].name = name;
  if (nationality) authors[authorIndex].nationality = nationality;
  if (birthYear !== undefined) authors[authorIndex].birthYear = parseInt(birthYear);
  
  res.json(authors[authorIndex]);
});

// DELETE - Delete an author
app.delete('/authors/:id', (req, res) => {
  const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
  
  if (authorIndex === -1) {
    return res.status(404).json({ error: "Author not found" });
  }
  
  const deletedAuthor = authors[authorIndex];
  authors.splice(authorIndex, 1);
  
  res.json({ 
    message: "Author deleted successfully",
    deletedAuthor 
  });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
  console.log(`\nAvailable endpoints:`);
  console.log(`GET    http://localhost:3000/authors - Get all authors`);
  console.log(`GET    http://localhost:3000/authors/:id - Get author by id`);
  console.log(`POST   http://localhost:3000/authors - Create new author`);
  console.log(`PUT    http://localhost:3000/authors/:id - Update author (full)`);
  console.log(`PATCH  http://localhost:3000/authors/:id - Update author (partial)`);
  console.log(`DELETE http://localhost:3000/authors/:id - Delete author`);
});
