var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

const Book = require('./models').Book;
const db = require('./config/config');



var app = express();

/******************
SERVING THE STATIC FILES
******************/
app.use(express.static('public'))


/******************
VIEW ENGINE SETUP
******************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/******************
BEGIN ROUTES
******************/

app.get('/', (req, res, next) =>{
  res.redirect('/books')
  });

app.get('/books', (req, res, next) => {
  console.log('i am the book render')
  Book.findAll()
    .then(books => {
      res.render('index', {
        books
      })
    })
    .catch(err => console.log(err))
  });

// form route
app.get('/books/new', (req, res, next) => {
  console.log("i am the NEW BOOKS GET ROUTE")
  res.render('new-book', {title: "New Book"});
})

app.get('/books/id', (req, res) => {
  res.render('update-book')
})

// Post a new Book from a form
console.log("hi")
app.use(bodyParser.urlencoded({ extended: false }));

//when i am on the "/books/new" route a form appears
app.post('/books/new', (req, res) => {
  console.log('this is a post route') //This was for testing purposes just to see if the route was firing at any point and I have never seen log happen. I expect it to occur when I submit the form
  let { title, author, genre, year } = req.body // In the tutoral, destructuring was used to assisgn req.body to each variable. I am a little confused by this, but see how it can work
  let errors = []; // In the tutorial, this errors array holds errors that occur when the form fields are blank. When i try to declare the array in the view, I get an error saying that its undefined. So that may be a hint that this post route is never firing 

  if(!title) {
    errors.push({ text: 'Please add a title'});
  }
  if(!author) {
    errors.push({ text: 'Please add an author'});
  }
  if(!genre) {
    errors.push({ text: 'Please add a genre'});
  }
  if(!year) {
    errors.push({ text: 'Please add a year'});
  }

  if(errors.length > 0) {
    res.render('books/new', {
      errors,
      title,
      author,
      genre,
      year
    });

  } else { //if the errors array does not have an error, then the form will create a new entry.
    Book.create({
      title,
      author,
      genre,
      year
    })
      .then(book => res.redirect('/books')) //redirects to books
      .catch(err => console.log(err));
  }
})








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
