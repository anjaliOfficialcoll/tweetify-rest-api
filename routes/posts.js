const express = require('express');
const router = express.Router();
const { Post, posts } = require('../models/post');

// Index - GET /posts - Show all posts
router.get('/', (req, res) => {
    res.render('posts/index', { posts });
});

// New - GET /posts/new - Show form to create new post
router.get('/new', (req, res) => {
    res.render('posts/new');
});

// Create - POST /posts - Create a new post
router.post('/', (req, res) => {
    const { username, content } = req.body;
    const newPost = new Post(username, content);
    posts.push(newPost);
    res.redirect('/posts');
});

// Show - GET /posts/:id - Show a specific post
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('posts/show', { post });
});

// Edit - GET /posts/:id/edit - Show form to edit a post
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    res.render('posts/edit', { post });
});

// Update - PATCH /posts/:id - Update a specific post
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send('Post not found');
    }
    post.content = content;
    res.redirect(`/posts/${id}`);
});

// Delete - DELETE /posts/:id - Delete a specific post
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).send('Post not found');
    }
    posts.splice(index, 1);
    res.redirect('/posts');
});

module.exports = router;
