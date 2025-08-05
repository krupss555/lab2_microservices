const express = require("express");
const app = express();

app.use(express.json());  // Needed to parse JSON body

let users = [];  // In-memory array to store users

// Root route
app.get("/", (req, res) => {
  res.send("User Service is running.");
});

// Create a new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Start the User Service on port 3001
app.listen(3001, () => {
  console.log("User Service running on http://localhost:3001");
});