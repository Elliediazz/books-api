const express = require('express')
const router = express.Router()
const cors = require('cors')
const app = express()
 
app.use(cors())

const Book = require('../models/book')

//seed data
router.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

// Get all books
router.get('/', async (req,res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        console.log(error)
        res.send('404 ERROR')
    }
})

//Get by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.json(book)
    } catch (error) {
        console.log(error)
        res.send('404 ERROR')
    }
})

//Post New book
router.post('/', async (req, res) => {
    try {
        let newBook = await Book.create(req.body)
        res.json(newBook)
    } catch (error) {
        console.log(error)
        res.send('404 ERROR')
    }
})

//Update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Book.findByIdAndUpdate(id, req.body)
        res.redirect('/books')
    } catch (error) {
        console.log(error)
        res.send('404 ERROR')
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Book.findByIdAndDelete(id)
        res.send('Book Deleted')
    } catch (error) {
        console.log(error)
        res.send('404 ERROR')
    }
})

module.exports = router