const express = require('express')
const logger = require('./logger')
const store = require('./store')
const { v4: uuidv4 } = require('uuid')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    .get((req,res) => {
        res.json(store.bookmarks)
    })
    .post(bodyParser, (req,res) => {
        const { title, url, description, rating } = req.body

        if(!title) {
            logger.error('Title is required');
            return res.status(400).send('Invalid Data')
        }
        if(!url) {
            logger.error('Url is required');
            return res.status(400).send('Invalid Data')
        }
        if(!description) {
            logger.error('Description is required');
            return res.status(400).send('Invalid Data')
        }
        if(!rating) {
            logger.error('Rating is required');
            return res.status(400).send('Invalid Data')
        }

        const id = uuidv4();

        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        };

        store.bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} created`);
        res.status(201).location(`http://localhost:8000/bookmarks/${id}`).json(bookmark)
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