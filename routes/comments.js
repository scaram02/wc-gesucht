const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require('../models/Comment');
const Toilet = require('../models/Toilet');
const User = require("../models/User");
const { route } = require("./auth");



// create a comment
router.post('/:id', (req, res, next) => {
const {upVotes, downVotes, comment, user} = req.body
Comment.create({
    upVotes, downVotes, comment, user
})
.then(addedComment => {
    return Toilet.findByIdAndUpdate
    (req.params.id,
      { $push: { comments: addedComment._id } },
      { new: true }
        )
    .populate({path: "comments", populate: {path: 'user'}})
    .then(toilet => {
        res.json(toilet)
    })
    .catch(err => {
        res.json(err)
    })
})
})



// delete a comment
router.put('/:id', (req, res, next) => {
    const commentId = req.body.commentId;
    console.log("i bims, the uhrsprüngliche commentId", commentId)
    Toilet.findByIdAndUpdate(req.params.id, { $pull: {comments: commentId}})
    .then(commentedToilet => {   
        res.json(commentedToilet);
        
        return Comment.deleteOne({ _id: commentId}) 
        .then(data => {
            console.log("Deleted in comments.js ROUTE: ", data)
        })
        .catch(err => {
            next(err)
        })
    })
    .catch(err => {
        res.json(err)
    })
})


// added useFindAndModify in app.js, check out later if problems


module.exports = router;