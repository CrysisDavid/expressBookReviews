const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    try {
        const response = await axios.get('BOOK_SHOP_URL');
        const books = response.data;
        return res.send(JSON.stringify(books, null, 4));
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`BOOK_SHOP_URL/${isbn}`);
        const book = response.data;
        if (response.result) {
            return res.send(JSON.stringify(book));
        }
        return res.status(500).json({ message: "Not found the book" });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    try {
        const author = req.params.author;
        const response = await axios.get(`BOOK_SHOP_URL/author/${author}`);
        const book = response.data;
        if (response.result) {
            return res.send(JSON.stringify(book));
        }
        return res.status(500).json({ message: "Not found the books by author" });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    try {
        const author = req.params.author;
        const response = await axios.get(`BOOK_SHOP_URL/author/${author}`);
        const book = response.data;
        if (response.result) {
            return res.send(JSON.stringify(book));
        }
        return res.status(500).json({ message: "Not found the books by author" });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books", error: error.message });
    }
    
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
