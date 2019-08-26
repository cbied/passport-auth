const express = require('express'),
    router = express.Router(),
    { ensureAuthenticated } = require('../../config/auth');
    
    
// Welcome page
router.get('/', (req,res) => res.render('welcome'))

// Dashboard page
router.get('/dashboard', ensureAuthenticated, (req,res) => {
    res.render('dashboard', {
        name: req.user.name
    })
})

module.exports = router