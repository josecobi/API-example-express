const express = require("express");
const router = express.Router();
const error = require("../utilities/error");

const comments = require("../data/comments");

router
    .route("/")
    .get((req, res) => {
        const links = [
            {
                href: "/comments",
                rel: "comments",
                type: "GET"
            }
        ] 
        res.json({comments, links});
    })
    .post((req, res) => {
        if(req.body.id && req.body.userId && req.body.postId && req.body.body){
            const comment = {
                id: req.body.id,
                userId: req.body.userId,
                postId: req.body.postId,
                body: req.body.body
            }
            comments.push(comment);
            res.json(comments[comments.length - 1]);
        } 
        else next(error(400, "Insufficient Data"));
    });


router
    .route("/:id")
    .get((req, res) => {
       
        if(!req.params.id){
            next(error(400, "Insufficient Data"));
        }
        // find a comment in ./data/comments which id is equal to the id sent in the request
        const comment = comments.find((c) => c.id == req.params.id);

        //If no comment found, send the error to the error handling middleware
        if(!comment){
            next(error(404, "Comment not found"));
        }
        // If found, send response in json format
        else {
            const links =[
                {
                    href: `/comments/${req.params.id}`,
                    rel: "comments",
                    type: "GET"
                }
            ]
            res.json({comment, links})
        }
    })

module.exports = router;