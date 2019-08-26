const express = require('express'),
    router = express.Router(),
    // User model
    User = require('../../models/Users'),
    brcypt = require('bcryptjs');


// Login page
router.get('/login', (req,res) => res.render('login'))

// Register Page
router.get('/register', (req,res) => res.render('register'))

// Register handle
router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body,
        errors = [];

    // check required fields
    if( !name || !email || !password || !password2 ) {
        errors.push({ msg: 'Please fill in all fields'})
    }

    // check passwords match
    if( password !== password2 ) {
        errors.push({ msg: 'Passwords do not match'})
    }

    // check password > 6 characters 
    if( password.length < 6 ) {
        errors.push({ msg: 'Password must be more than 6 characters'})
    }

    if( errors.length > 0 ) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // validation passes
        // findOne mongoose method to find record
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // user already exists 
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    
                }
            })
    }

})

module.exports = router