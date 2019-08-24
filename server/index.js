require('dotenv').config()
const express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    { SERVER_PORT } = process.env
    
// app.use(express.json())

// EJS middleware
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})
