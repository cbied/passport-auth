const express = require('express'),
    router = express.Router();


    // Login page
    router.get('/login', (req,res) => res.render('login'))

    // Register Page
    router.get('/register', (req,res) => res.render('register'))



    module.exports = router