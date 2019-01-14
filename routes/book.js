var express = require('express');
var router = express.Router();
const db = require('../config/config');
const Book = require('../models').Book;

/* GET shows full list of books. */
router.get('/', (req, res, next) =>
  Book.findAll()
    .then(books => {
      res.render('book', {
        books
      })
    })
    .catch(err => console.log(err)));

// form route
router.get('/new', (req, res) => {
  res.render('new-book')
})

router.post('/add', (req, res) => {
    const data = {
        title: 'Unbroken', 
        author: 'Bob Jones',
        genre: 'nonfiction',
        year: 2019,
    }
    let = { title, author, genre, year } = data;
    Book.create({
        title,
        author,
        genre,
        year
    })
    .then(book => res.redirect('/book'))
    .catch(err => console.log(err));
});


module.exports = router;