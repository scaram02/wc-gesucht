const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        } // ??
    ],
    upVotes: Number,
    downVotes: Number,
    comment: String
},
{
    timestamps : true,
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment