// Exercise 3: Pagination for GET all books endpoint

const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample books data (larger dataset for pagination demo)
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
  { id: 13, title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866 },
  { id: 14, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", year: 1880 },
  { id: 15, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997 }
];

// GET all books with pagination
app.get('/books', (req, res) => {
  // Get page and limit from query parameters, with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  // Validate page and limit
  if (page < 1) {
    return res.status(400).json({ error: "Page must be greater than 0" });
  }
  
  if (limit < 1 || limit > 100) {
    return res.status(400).json({ error: "Limit must be between 1 and 100" });
  }
  
  // Calculate pagination values
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalBooks = books.length;
  const totalPages = Math.ceil(totalBooks / limit);
  
  // Get paginated results
  const paginatedBooks = books.slice(startIndex, endIndex);
  
  // Prepare response with pagination metadata
  const response = {
    page: page,
    limit: limit,
    totalBooks: totalBooks,
    totalPages: totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    data: paginatedBooks
  };
  
  // Add next and previous page links
  if (response.hasNextPage) {
    response.nextPage = `/books?page=${page + 1}&limit=${limit}`;
  }
  
  if (response.hasPreviousPage) {
    response.previousPage = `/books?page=${page - 1}&limit=${limit}`;
  }
  
  res.json(response);
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

// To test the pagination
// http://localhost:3000/books?page=1&limit=5
// http://localhost:3000/books?page=2&limit=5
// http://localhost:3000/books?page=3&limit=5