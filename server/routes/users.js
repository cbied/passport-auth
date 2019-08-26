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
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                    

                    // hash password
                    brcypt.genSalt(12, (err, salt) => {
                        brcypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err

                            // set password to hash
                            newUser.password = hash
                            // save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are not registered and can log in!')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }

})

module.exports = router