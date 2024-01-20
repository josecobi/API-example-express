const express = require("express");
const router = express.Router();

const users = require("../data/users");
const posts = require("../data/posts")
const error = require("../utilities/error");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      },
    ];

    res.json({ users, links });
  })

  // logic for adding a new user
  .post((req, res, next) => {
    // Check if the resquest includes a name, username and email
    if (req.body.name && req.body.username && req.body.email) {
        // Check if the username already exists
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }
      // add values to the properties of the new user
      const user = {
        // The id for the new user will be the id of the last user in the array + 1.
        id: users[users.length - 1].id + 1,
        // take the information from the body of the request (name, username, email)
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
      // Add the new user to the array of users
      users.push(user);
      // Respond to the request with the new user in json format
      res.json(users[users.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });

  router   
    .route("/:id/posts")
    .get((req, res, next) => {
        // Check if there a user was provided
        if(!req.params.id){
            next(error(400, "Insufficient Data"));
        }
        // find a user in ./data/users whose id is equal to the id sent in the request
        const user = users.find((u) => u.id == req.params.id);
        if(!user){
            next(error(404, "User not found"));
        }
        else{
            console.log(user);
            const userPosts = posts.filter((p) => p.userId === user.id);
            const links = [
                {
                    href: "/:id/posts",
                    rel: "",
                    type: "GET"
                }
            ]
            res.json({userPosts, links});
        }
    });

module.exports = router;
