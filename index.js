const express = require("express");
const app = express();
const port = 3000;

// Importing the data from our fake database files.
const users = require("./data/users");
const posts = require("./data/posts");

// Creating a GET route for the entire users database.
// This would be impractical in larger data sets.
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user){
    res.json(user);
  }
  else {
    res.send("User Not Found");
  } 
});

// Creating a GET route for the entire posts database.
// This would be impractical in larger data sets.
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Creating a simple GET route for individual posts,
// using a route parameter for the unique id.
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) {
        res.json(post);
  }
  else {
        res.send("Post not found");
  }
});

app.get("/", (req, res) => {
    res.send("All usable routes start with /api");
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});
