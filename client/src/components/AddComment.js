import React, { Component } from 'react'
import axios from 'axios'
import '../stylesheets/comments.css'

export default class AddComment extends Component {
    constructor(props){
        super(props)

        this.state = {
            comment: '',
            upVotes: 0,
            downVotes: 0
        }

    }


handleCommentChange = e => {
    this.setState({
    [e.target.name]: e.target.value
    })
}


handleSubmit = e => {
    e.preventDefault()
    const {comment, upVotes, downVotes} = this.state

    if (!comment) return;

   
    axios
    .post(`/api/comments/${this.props.toiletId}`, 
    { 
        comment, upVotes, downVotes,
        user: this.props.user._id
    })
    .then(this.props.getAllToilets) 
    .then(this.setState({ comment: "" }))
    .then(() => { 
        this.props.getSingleToilet()
        this.props.getAllToilets() 
    })
    .catch(err => {
        console.log(err)
    })
}




    render() {
        return (
            <div className='add-comment-container'>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <textarea
                    type="text"
                    name="comment"
                    value={this.state.comment}
                    onChange={this.handleCommentChange} />
                    </div>
                    <button type="submit" >Add a comment</button>
                </form>
            </div>
        )
    }
}
