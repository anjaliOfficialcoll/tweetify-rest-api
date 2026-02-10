const express = require("express");
const router = express.Router();
const Tweet = require("../models/Tweet");
const Comment = require("../models/Comment");
const isLoggedIn = require("../middlewares/isLoggedIn");

// Get all tweets
router.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({}).populate("author").sort({ createdAt: -1 });
    res.render("index.ejs", { posts: tweets });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tweets");
  }
});

// Show new tweet form
router.get("/tweets/new", isLoggedIn, (req, res) => {
  res.render("new.ejs");
});

// Create new tweet
router.post("/tweets", isLoggedIn, async (req, res) => {
  try {
    // Validate tweet content
    const content = req.body.content?.trim();
    if (!content || content.length === 0) {
      req.flash('error', 'Tweet cannot be empty');
      return res.redirect("/tweets/new");
    }
    
    if (content.length > 280) {
      req.flash('error', 'Tweet cannot exceed 280 characters');
      return res.redirect("/tweets/new");
    }
    
    const tweet = new Tweet({
      content: content,
      author: req.session.userId
    });
    await tweet.save();
    req.flash('success', 'Tweet posted successfully!');
    res.redirect("/tweets");
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to post tweet');
    res.redirect("/tweets");
  }
});

// Show single tweet
router.get("/tweets/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("author");
    if (!tweet) {
      return res.status(404).send("Tweet not found");
    }
    const comments = await Comment.find({ tweet: req.params.id }).populate("author").sort({ createdAt: -1 });
    res.render("show.ejs", { post: tweet, comments: comments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tweet");
  }
});

// Show edit form
router.get("/tweets/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("author");
    if (!tweet) {
      req.flash('error', 'Tweet not found');
      return res.redirect("/tweets");
    }
    
    // Check if user owns this tweet
    if (!tweet.author._id.equals(req.session.userId)) {
      req.flash('error', 'You can only edit your own tweets');
      return res.redirect("/tweets");
    }
    
    res.render("edit.ejs", { post: tweet });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading tweet');
    res.redirect("/tweets");
  }
});

// Update tweet
router.post("/tweets/:id", isLoggedIn, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      req.flash('error', 'Tweet not found');
      return res.redirect("/tweets");
    }
    
    // Check if user owns this tweet
    if (!tweet.author.equals(req.session.userId)) {
      req.flash('error', 'You can only edit your own tweets');
      return res.redirect("/tweets");
    }
    
    // Validate content
    const content = req.body.content?.trim();
    if (!content || content.length === 0) {
      req.flash('error', 'Tweet cannot be empty');
      return res.redirect(`/tweets/${req.params.id}/edit`);
    }
    
    if (content.length > 280) {
      req.flash('error', 'Tweet cannot exceed 280 characters');
      return res.redirect(`/tweets/${req.params.id}/edit`);
    }
    
    tweet.content = content;
    await tweet.save();
    req.flash('success', 'Tweet updated successfully!');
    res.redirect("/tweets");
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to update tweet');
    res.redirect("/tweets");
  }
});

// Delete tweet
router.delete("/tweets/:id", isLoggedIn, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      req.flash('error', 'Tweet not found');
      return res.redirect("/tweets");
    }
    
    // Check if user owns this tweet
    if (!tweet.author.equals(req.session.userId)) {
      req.flash('error', 'You can only delete your own tweets');
      return res.redirect("/tweets");
    }
    
    await Tweet.findByIdAndDelete(req.params.id);
    req.flash('success', 'Tweet deleted successfully!');
    res.redirect("/tweets");
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to delete tweet');
    res.redirect("/tweets");
  }
});

// Like a tweet
router.post("/tweets/:id/like", isLoggedIn, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      req.flash('error', 'Tweet not found');
      return res.redirect("/tweets");
    }

    // Check if user already liked this tweet
    const alreadyLiked = tweet.likes.includes(req.session.userId);
    
    if (alreadyLiked) {
      // Unlike
      tweet.likes = tweet.likes.filter(id => !id.equals(req.session.userId));
      await tweet.save();
      req.flash('success', 'Tweet unliked');
    } else {
      // Like
      tweet.likes.push(req.session.userId);
      await tweet.save();
      req.flash('success', 'Tweet liked!');
    }
    
    res.redirect("/tweets");
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to like tweet');
    res.redirect("/tweets");
  }
});

// Add comment to tweet
router.post("/tweets/:id/comments", isLoggedIn, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      req.flash('error', 'Tweet not found');
      return res.redirect("/tweets");
    }

    // Validate comment text
    const text = req.body.text?.trim();
    if (!text || text.length === 0) {
      req.flash('error', 'Comment cannot be empty');
      return res.redirect(`/tweets/${req.params.id}`);
    }
    
    if (text.length > 280) {
      req.flash('error', 'Comment cannot exceed 280 characters');
      return res.redirect(`/tweets/${req.params.id}`);
    }

    const comment = new Comment({
      text: text,
      author: req.session.userId,
      tweet: req.params.id
    });
    
    await comment.save();
    req.flash('success', 'Comment added successfully!');
    res.redirect(`/tweets/${req.params.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to add comment');
    res.redirect("/tweets");
  }
});

module.exports = router;
