// Exercise 5: Search endpoint for books by title

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
  { id: 6, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { id: 8, title: "Lord of the Flies", author: "William Golding", year: 1954 },
  { id: 9, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { id: 10, title: "The Odyssey", author: "Homer", year: -800 },
  { id: 11, title: "Moby Dick", author: "Herman Melville", year: 1851 },
  { id: 12, title: "War and Peace", author: "Leo Tolstoy", year: 1869 },
  { id: 13, title: "Great Expectations", author: "Charles Dickens", year: 1861 }
];

// GET all books
app.get('/books', (req, res) => {
  res.json({
    count: books.length,
    data: books
  });
});

// GET search books by title
app.get('/books/search', (req, res) => {
  const { title, q } = req.query;
  
  // Support both 'title' and 'q' query parameters
  const searchQuery = title || q;
  
  // Check if search query is provided
  if (!searchQuery) {
    return res.status(400).json({ 
      error: "Search query is required. Use ?title=<search> or ?q=<search>" 
    });
  }
  
  // Search for books with titles containing the search query (case-insensitive)
  const results = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Return results
  res.json({
    searchQuery: searchQuery,
    count: results.length,
    data: results
  });
});

// GET single book by id
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  
  res.json(book);
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
  console.log(`\nAvailable endpoints:`);
  console.log(`GET http://localhost:3000/books - Get all books`);
  console.log(`GET http://localhost:3000/books/search?title=great - Search books by title`);
  console.log(`GET http://localhost:3000/books/search?q=the - Search books (alternative)`);
  console.log(`GET http://localhost:3000/books/:id - Get book by id`);
});
