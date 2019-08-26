require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    flash = require('connect-flash'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    { SERVER_PORT } = process.env;
    

// Passport config
require('../config/passport')(passport)

// DB Config
const db = require('../config/keys').MongoURI

// connect Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`Server/index.js mongoose: ${err}`))

// EJS middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')

// body parser middleware
app.use(express.urlencoded({ extended: false }))

// express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash middleware
app.use(flash())

// global vars for messages
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})
