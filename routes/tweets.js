const express = require("express");
const router = express.Router();
const Tweet = require("../models/Tweet");
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
    const tweet = new Tweet({
      content: req.body.content,
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
    res.render("show.ejs", { post: tweet });
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
    
    tweet.content = req.body.content;
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

module.exports = router;
