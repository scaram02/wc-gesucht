const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: 
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
    upVotes: {
        type: Number, 
        default: 0
    },
    downVotes: {
        type: Number, 
        default: 0
    },
    comment: {type: String, required: true}
},
{
    timestamps : true,
})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment