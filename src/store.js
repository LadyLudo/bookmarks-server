const { v4: uuidv4 } = require('uuid')

const bookmarks = [
    {
        id: uuidv4(),
        title:'Title 1',
        url: 'https://www.thinkful.com',
        description: 'Interesting content here',
        rating: 5
    },
    {
        id: uuidv4(),
        title:'Title 2',
        url: 'https://www.thinkful.com',
        description: 'Interesting content here',
        rating: 4
    },
    {
        id: uuidv4(),
        title:'Title 2',
        url: 'https://www.thinkful.com',
        description: 'Interesting content here',
        rating: 3
    }
]

module.exports = { bookmarks }