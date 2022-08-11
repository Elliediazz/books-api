//Dependencies
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
//const bookRoutes = require ('./controllers/book_controller')

const app =express()

//middleware
app.use(express.json())


//Routes/ controllers
app.use('/books', require('./controllers/book_controller'))

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.get('*', (req, res) => {
    res.render('error404')
})


// Listen for Connection 
const PORT = process.env.PORT
app.listen(PORT, () => {
    //DB connection
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

    console.log(`listening on port ${PORT}`)
}) 

