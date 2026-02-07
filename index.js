const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.use('/posts', postRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Tweetify server is running on http://localhost:${PORT}`);
});

module.exports = app;
