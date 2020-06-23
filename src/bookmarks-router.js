const express = require('express')
const logger = require('./logger')
const store = require('./store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req,res) => {
        res.json(store.bookmarks)
    })
    .post((req,res) => {

    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req,res) => {
        const { id } = req.params;
        const bookmark = store.bookmarks.find(b => b.id == id);

        if(!bookmark){
            logger.error(`Bookmark with id ${id} not found.`);
            return res.status(404).send('Bookmark not found')
        }
        res.json(bookmark)
    })
    .delete((req,res) => {

    })

module.exports = bookmarksRouter