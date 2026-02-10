# tweetify-rest-api

Tweetify is a REST API-driven microblogging platform that supports create, read, update, and delete operations for posts. It is developed using Node.js and Express, uses EJS for server-side views, and demonstrates MVC design, RESTful routing, and database integration.

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (v4.0 or higher) - running locally or have access to a MongoDB instance

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anjaliOfficialcoll/tweetify-rest-api.git
   cd tweetify-rest-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Copy the `.env.example` file to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```
   PORT=8080
   MONGODB_URL=mongodb://127.0.0.1:27017/tweetify
   SESSION_SECRET=your-secret-key-here-change-this-in-production
   ```

4. **Start MongoDB:**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Linux/Mac
   sudo systemctl start mongod
   # or
   mongod
   
   # On Windows
   # Start MongoDB service from Services or run mongod.exe
   ```

## How to Run

Start the application:
```bash
node index.js
```

The server will start on the port specified in your `.env` file (default: 8080).

You should see:
```
Server is running on port 8080
Visit http://localhost:8080
Connected to MongoDB
```

## Usage

Once the server is running, open your browser and navigate to:
```
http://localhost:8080
```

### Features

- **User Authentication**: Register and login functionality
- **Create Tweets**: Post new tweets
- **Read Tweets**: View all tweets
- **Update Tweets**: Edit your own tweets
- **Delete Tweets**: Remove your tweets
- **Session Management**: Secure session handling with MongoDB store

## Project Structure

```
tweetify-rest-api/
├── index.js           # Main application entry point
├── models/            # Database models (User, Tweet)
├── routes/            # Route handlers (users, tweets)
├── views/             # EJS templates
├── public/            # Static files (CSS, images)
├── middlewares/       # Custom middleware functions
├── package.json       # Project dependencies
└── .env.example       # Environment variables template
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **EJS** - Templating engine
- **Express Session** - Session management
- **bcryptjs** - Password hashing
- **Connect Flash** - Flash messages
