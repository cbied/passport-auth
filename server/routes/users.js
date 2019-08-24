const express = require('express'),
    router = express.Router();


    // Login page
    router.get('/login', (req,res) => res.send('Login'))

    // Register Page
    router.get('/register', (req,res) => res.send('Register'))


    
    module.exports = router