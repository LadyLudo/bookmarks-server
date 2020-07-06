
function makeBookmarksArray() {
    return [
        {
            id: 1,
            title:'Title 1',
            url: 'https://www.thinkful1.com',
            description: 'Interesting content here',
            rating: 5
        },
        {
            id: 2,
            title:'Title 2',
            url: 'https://www.thinkful2.com',
            description: 'Interesting content here',
            rating: 4
        },
        {
            id: 3,
            title:'Title 3',
            url: 'https://www.thinkful3.com',
            description: 'Interesting content here',
            rating: 3
        }
    ];
}

module.exports = {
    makeBookmarksArray,
}