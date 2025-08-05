const express = require("express");
const app = express();

app.use(express.json());  // Needed to parse JSON body

let posts = [];  // In-memory array to store posts

// Root route
app.get("/", (req, res) => {
  res.send("Post Service is running.");
});

// Create a new post
app.post("/posts", (req, res) => {
  const { title, content, userId } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    userId,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Update a post
app.put("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) return res.status(404).send("Post not found");

  post.title = req.body.title;
  post.content = req.body.content;
  res.json(post);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== postId);
  res.status(204).send();
});

// Start the Post Service on port 3002
app.listen(3002, () => {
  console.log("Post Service running on http://localhost:3002");
});