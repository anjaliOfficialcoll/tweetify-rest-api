# 📱 Tweetify REST API

Tweetify is a REST API-driven microblogging platform that supports create, read, update, and delete operations for posts. It is developed using Node.js and Express, uses EJS for server-side views, and demonstrates MVC design, RESTful routing, and database integration.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete posts
- **RESTful API**: Follows REST architectural principles with proper HTTP methods
- **MVC Architecture**: Clean separation of concerns with Models, Views, and Controllers
- **Server-Side Rendering**: Uses EJS templating engine for dynamic HTML generation
- **Responsive Design**: Modern, Twitter-inspired UI that works on all devices
- **In-Memory Database**: Simple data persistence for demonstration purposes

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/anjaliOfficialcoll/tweetify-rest-api.git
cd tweetify-rest-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
tweetify-rest-api/
├── models/
│   └── post.js          # Post model and in-memory database
├── routes/
│   └── posts.js         # RESTful routes for posts
├── views/
│   └── posts/
│       ├── index.ejs    # List all posts
│       ├── new.ejs      # Create new post form
│       ├── show.ejs     # Display single post
│       └── edit.ejs     # Edit post form
├── public/
│   └── css/
│       └── style.css    # Application styles
├── index.js             # Main application entry point
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## 🔄 RESTful Routes

| Method | Route            | Description           |
|--------|------------------|-----------------------|
| GET    | /posts           | List all posts        |
| GET    | /posts/new       | Show new post form    |
| POST   | /posts           | Create a new post     |
| GET    | /posts/:id       | Show a specific post  |
| GET    | /posts/:id/edit  | Show edit post form   |
| PATCH  | /posts/:id       | Update a specific post|
| DELETE | /posts/:id       | Delete a specific post|

## 💻 Usage

### Creating a Post
1. Click the "✨ Create New Post" button
2. Enter your username
3. Write your content
4. Click "Post"

### Viewing Posts
- All posts are displayed on the home page
- Click "View" to see the full post details

### Editing a Post
1. Click "Edit" on any post
2. Modify the content (username cannot be changed)
3. Click "Update Post"

### Deleting a Post
1. Click "Delete" on any post
2. Confirm the deletion in the dialog

## 🏗️ Architecture

### MVC Design Pattern

**Models** (`models/post.js`):
- Defines the Post data structure
- Manages in-memory data storage
- Provides sample data for demonstration

**Views** (`views/posts/*.ejs`):
- EJS templates for rendering HTML
- Responsive and user-friendly interface
- Consistent styling across all pages

**Controllers** (`routes/posts.js`):
- Handles HTTP requests and responses
- Implements business logic for CRUD operations
- Routes requests to appropriate views

## 🎨 Technology Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS
- **HTTP Method Override**: method-override (for PUT/PATCH/DELETE)
- **Unique IDs**: UUID

## 📝 API Examples

### Create a Post (cURL)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john&content=Hello World"
```

### Update a Post (cURL)
```bash
curl -X POST "http://localhost:3000/posts/{POST_ID}?_method=PATCH" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "content=Updated content"
```

### Delete a Post (cURL)
```bash
curl -X POST "http://localhost:3000/posts/{POST_ID}?_method=DELETE"
```

## 🔧 Development

To run the application in development mode:
```bash
npm run dev
```

## 📦 Dependencies

- **express**: Web application framework
- **ejs**: Templating engine
- **method-override**: Support for PUT and DELETE methods in forms
- **uuid**: Generate unique identifiers for posts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👥 Author

Created as a demonstration of RESTful API design and MVC architecture using Node.js and Express.
