const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();

let users = []; // Assuming this array stores the registered users

// Placeholder function to check if the provided username is valid
const isValid = (username) => {
    // Placeholder logic to check if the username is valid.
    // You can implement your own logic here.
    return users.some(user => user.username === username);
}

// Placeholder function to authenticate the user
const authenticatedUser = (username, password) => {
    // Placeholder logic to authenticate the user.
    // You can implement your own logic here, such as checking against a database.
    return users.some(user => user.username === username && user.password === password);
}

// Route for user login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username exists
    if (!isValid(username)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the provided credentials are valid
    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, "your_secret_key");

    // Return the token as a response
    return res.status(200).json({ token });
});

// Route for adding a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Generate a random book review
    const reviews = [
        "Great book!",
        "Highly recommended",
        "Excellent read",
        "Must-read for everyone",
        "Informative and engaging"
    ];

    const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

    // Assuming the book review is stored in the book object
    book.review = randomReview;

    return res.status(200).json({ message: "Book review added successfully", book });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
