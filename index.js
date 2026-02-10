const express=require("express");
const app=express();
require('dotenv').config();

const port=process.env.PORT || 8080;
const path=require("path");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const User = require("./models/User");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

// Import routes
const userRoutes = require("./routes/users");
const tweetRoutes = require("./routes/tweets");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tweetify")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

// Session configuration - MUST come before routes
app.use(session({
  secret: process.env.SESSION_SECRET || "tweetify-secret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tweetify",
    touchAfter: 24 * 3600
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Flash messages middleware
app.use(flash());

// Middleware to make currentUser and flash messages available in all views
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      res.locals.currentUser = await User.findById(req.session.userId);
    } catch (err) {
      res.locals.currentUser = null;
    }
  } else {
    res.locals.currentUser = null;
  }
  
  // Make flash messages available in all views
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.warning = req.flash('warning');
  
  next();
});


// Mount routes
app.use("/", userRoutes);
app.use("/", tweetRoutes);

// Root route
app.get("/", (req, res) => {
  if (req.session.userId) {
    res.redirect("/tweets");
  } else {
    res.redirect("/login");
  }
});

// 404 Error Handler - Must be after all other routes
app.use((req, res, next) => {
  res.status(404).render("404.ejs");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  req.flash('error', 'Something went wrong!');
  res.status(500).redirect("/tweets");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`Visit http://localhost:${port}`);
});
