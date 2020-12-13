import React from 'react'
import axios from 'axios'


const CommentList = props => {

  let deleteComment = commentId => {
    axios
    .put(`/api/comments/${props.toiletId}`, {commentId: commentId})
    .then(() => {
        // console.log('-------deleted: ', commentId, '------------------')
        props.getSingleToilet()
        props.getAllToilets()
    })
}

    const commentList = (
      <>
        {props.toilet.comments && props.toilet.comments
        .map(comment => {
            const date = comment.createdAt.split('T')[0].split('-').reverse().join('.')
            return (
              <div key={comment._id} className='comment-container'>
                {/* <p>On {date} <Link to={`/profiles/${comment.user.username}`} >{comment.user.username}</Link> commented:</p> */}
                <p>On {date} {comment.user.username} commented:</p>

                <p>{comment.comment}</p>
                {comment.user.username === props.user.username? <button onClick={()=> deleteComment(comment._id)}>Delete this comment</button> : <div></div>}
              </div>
            );
          })}
      </>
    );
  
    return props.toilet? <div>{commentList}</div> : <div></div>;
  };

export default CommentList

