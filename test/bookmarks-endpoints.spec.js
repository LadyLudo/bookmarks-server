require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { makeBookmarksArray } = require('./bookmarks.fixtures')

describe('Bookmarks endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('bookmarks').truncate())

    afterEach('cleanup', () => db('bookmarks').truncate())

    describe('GET /bookmarks', () => {
        context('Given no bookmarks', () => {
            it('responds with a 200 and an empty list', () => {
                return supertest(app)
                    .get('/bookmarks')
                    .set('Authorization',`Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })
        context('Given that there are bookmarks in the database', () => {
            const testBookmarks = makeBookmarksArray()

            beforeEach('insert bookmarks', () => {
                return db
                    .into('bookmarks')
                    .insert(testBookmarks)
            })

            // it('responds with 200 and all the bookmarks', () => {
            //     return supertest(app)
            //     .get('/bookmarks')
            //     .set('Authorization',`Bearer ${process.env.API_TOKEN}`)
            //     .expect(200, testBookmarks)
            // })
        })

    })

    describe('GET /bookmarks/:bookmark_id', () => {
        context('Given no bookmarks', () => {
            it('responds with 404', () => {
                const bookmarkId = 12345
                return supertest(app)
                    .get(`/bookmarks/${bookmarkId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: 'Bookmark does not exist'}})
            })
        })
        context('Given there are bookmarks in the database', () => {
            const testBookmarks = makeBookmarksArray()

            beforeEach('insert bookmarks', () => {
                return db
                    .into('bookmarks')
                    .insert(testBookmarks)
            })

            // it('responds with 200 and the specified article', () => {
            //     const bookmarkId = 2
            //     const expectedBookmark = testBookmarks[bookmarkId - 1]
            //     return supertest(app)
            //         .get(`/bookmarks/${bookmarkId}`)
            //         .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            //         .expect(200, expectedBookmark)
            // })
        })
    })
})