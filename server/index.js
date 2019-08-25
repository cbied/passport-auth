require('dotenv').config()
const express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    { SERVER_PORT } = process.env;
    
// app.use(express.json())

// DB Config
const db = require('../config/keys').MongoURI

// connect Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`Server/index.js mongoose: ${err}`))

// EJS middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})
