// Exercise 2: Input validation middleware for year validation

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample books data
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 }
];

// Input validation middleware for year
const validateYear = (req, res, next) => {
  const { year } = req.body;
  
  // Check if year is provided
  if (year === undefined) {
    return next();
  }
  
  // Check if year is a valid number
  if (isNaN(year) || !Number.isInteger(Number(year))) {
    return res.status(400).json({ 
      error: "Year must be a valid integer" 
    });
  }
  
  const yearNum = parseInt(year);
  
  // Check if year is within a reasonable range (1000 to current year + 5)
  const currentYear = new Date().getFullYear();
  const minYear = 1000;
  const maxYear = currentYear + 5;
  
  if (yearNum < minYear || yearNum > maxYear) {
    return res.status(400).json({ 
      error: `Year must be between ${minYear} and ${maxYear}` 
    });
  }
  
  next();
};

// GET all books
app.get('/books', (req, res) => {
  res.json({
    count: books.length,
    data: books
  });
});

// POST - Add a new book with year validation
app.post('/books', validateYear, (req, res) => {
  const { title, author, year } = req.body;
  
  // Basic validation
  if (!title || !author) {
    return res.status(400).json({ 
      error: "Title and author are required" 
    });
  }
  
  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year ? parseInt(year) : null
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT - Update a book with year validation
app.put('/books/:id', validateYear, (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }
  
  const { title, author, year } = req.body;
  
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;
  if (year !== undefined) books[bookIndex].year = parseInt(year);
  
  res.json(books[bookIndex]);
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
