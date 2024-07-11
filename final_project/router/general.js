const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const book = books[req.params.isbn];

    if (book) {
        return res.send(JSON.stringify(book));
    }

    return res.status(500).json({ message: "Not found the book" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter((book) => book.author === author);
    if (booksByAuthor.length) {
        return res.send(JSON.stringify({ booksByAuthor }));
    }

    return res.status(500).json({ message: "Not found the books by author" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    const title = req.params.title;
    const booksByTitle = Object.values(books).filter((book) => book.title === title);
    if (booksByTitle.length) {
        return res.send(JSON.stringify({ booksByTitle }));
    }

    return res.status(500).json({ message: "Not found the books by title" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    const book = books[req.params.isbn];

    if (book) {
        return res.send(JSON.stringify(book.reviews));
    }

    return res.status(500).json({ message: "Not found the book" });
});

module.exports.general = public_users;
