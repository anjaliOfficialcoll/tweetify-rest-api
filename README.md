# Tweetify

A full-stack Twitter-like web application built with Node.js, Express.js, and MongoDB. Tweetify allows users to create, view, edit, and delete tweets with secure authentication and ownership management.

## 🚀 Features

- **User Authentication**: Secure registration and login system using bcrypt password hashing
- **Session Management**: Persistent sessions with express-session and MongoDB store
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for tweets
- **Tweet Ownership**: Only tweet authors can edit or delete their own tweets
- **Like System**: Users can like/unlike tweets
- **Comment System**: Users can comment on tweets
- **Character Limit**: 280-character limit for tweets and comments
- **Flash Messages**: Real-time feedback for user actions
- **Responsive UI**: Server-side rendered views using EJS templates

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

**Authentication & Security:**
- bcryptjs (password hashing)
- express-session (session management)
- connect-mongo (session store)

**View Engine:**
- EJS (Embedded JavaScript templates)

**Additional Tools:**
- method-override (HTTP method override)
- connect-flash (flash messages)
- dotenv (environment variables)
- uuid (unique identifiers)

## 📁 Folder Structure

```
tweetify-rest-api/
├── models/              # Database models
│   ├── User.js         # User schema
│   ├── Tweet.js        # Tweet schema
│   └── Comment.js      # Comment schema
├── routes/             # Route handlers
│   ├── users.js        # Authentication routes
│   └── tweets.js       # Tweet CRUD routes
├── middlewares/        # Custom middleware
│   └── isLoggedIn.js   # Authentication middleware
├── views/              # EJS templates
│   ├── users/          # User-related views
│   ├── partials/       # Reusable view components
│   └── *.ejs           # Tweet views (index, show, new, edit)
├── public/             # Static assets
│   ├── css/            # Stylesheets
│   └── images/         # Images
├── index.js            # Application entry point
├── .env.example        # Environment variables template
└── package.json        # Project dependencies
```

## 🛣️ Routes Overview

**Authentication Routes:**
- `GET /register` - User registration page
- `POST /register` - Create new user account
- `GET /login` - User login page
- `POST /login` - Authenticate user
- `POST /logout` - End user session

**Tweet Routes:**
- `GET /tweets` - View all tweets (homepage)
- `GET /tweets/new` - Create new tweet form
- `POST /tweets` - Submit new tweet
- `GET /tweets/:id` - View single tweet with comments
- `GET /tweets/:id/edit` - Edit tweet form (owner only)
- `POST /tweets/:id` - Update tweet (owner only)
- `DELETE /tweets/:id` - Delete tweet (owner only)
- `POST /tweets/:id/like` - Like/unlike a tweet
- `POST /tweets/:id/comments` - Add comment to tweet

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anjaliOfficialcoll/tweetify-rest-api.git
   cd tweetify-rest-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and update the following variables:
   ```env
   PORT=8080
   MONGODB_URL=mongodb://127.0.0.1:27017/tweetify
   SESSION_SECRET=your-secret-key-here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   ```

5. **Run the application**
   ```bash
   node index.js
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## 🎯 Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Access your account using email and password
3. **Create Tweet**: Post a tweet (up to 280 characters)
4. **View Tweets**: Browse all tweets on the homepage
5. **Interact**: Like tweets and add comments
6. **Manage**: Edit or delete your own tweets
7. **Logout**: Securely end your session

## 🔮 Future Enhancements

- [ ] User profile pages with bio and profile pictures
- [ ] Follow/unfollow functionality
- [ ] Tweet search and filtering
- [ ] Hashtag support
- [ ] Media uploads (images and videos)
- [ ] Real-time notifications
- [ ] Direct messaging between users
- [ ] Trending topics section
- [ ] Retweet functionality
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] API endpoints for mobile applications
- [ ] Dark mode theme
- [ ] Infinite scroll pagination

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👤 Author

Created as a portfolio project to demonstrate full-stack web development skills with Node.js, Express, and MongoDB.
