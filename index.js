const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

// Our route files for users and posts
const users = require('./routes/users')
const posts = require('./routes/posts')

// Use our routes, because duh...
app.use('/api/users', users)
app.use('/api/posts', posts)

app.get("/", (req, res) => {
  res.send("This is the root. All service routes should begin with /api.");
});

// 404 Middleware
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Resource Not Found" });
});

// Port listening Info
app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`)
  })