// Exercise 1: Query parameter filtering for books by author or year

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample books data
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
  { id: 4, title: "Animal Farm", author: "George Orwell", year: 1945 },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
  { id: 6, title: "Brave New World", author: "Aldous Huxley", year: 1932 }
];

// GET all books with optional filtering by author or year
app.get('/books', (req, res) => {
  const { author, year } = req.query;
  
  let filteredBooks = books;
  
  // Filter by author if provided
  if (author) {
    filteredBooks = filteredBooks.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  
  // Filter by year if provided
  if (year) {
    filteredBooks = filteredBooks.filter(book => 
      book.year === parseInt(year)
    );
  }
  
  res.json({
    count: filteredBooks.length,
    data: filteredBooks
  });
});

// GET single book by id
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  
  res.json(book);
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
