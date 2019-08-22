require('dotenv').config()
const express = require('express'),
    app = express(),
    { SERVER_PORT } = process.env

app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})