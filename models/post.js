const { v4: uuidv4 } = require('uuid');

class Post {
    constructor(username, content) {
        this.id = uuidv4();
        this.username = username;
        this.content = content;
        this.createdAt = new Date();
    }
}

// In-memory database for posts
let posts = [
    {
        id: uuidv4(),
        username: 'alice',
        content: 'Just setting up my tweetify account!',
        createdAt: new Date()
    },
    {
        id: uuidv4(),
        username: 'bob',
        content: 'Hello world! This is my first post.',
        createdAt: new Date()
    },
    {
        id: uuidv4(),
        username: 'charlie',
        content: 'Loving this new microblogging platform!',
        createdAt: new Date()
    }
];

module.exports = { Post, posts };
