import React, { Component } from 'react'
import AddComment from './AddComment'
import CommentList from './CommentList'


export default class Comments extends Component {

    render() {

        return (
            <div>
                <AddComment 
                user={this.props.user} 
                getSingleToilet={this.props.getSingleToilet}
                toiletId={this.props.toiletId}
                toilet={this.props.toilet}
                getAllToilets={this.props.getAllToilets}
               /> 

                <CommentList
               user={this.props.user} 
               getSingleToilet={this.props.getSingleToilet}
               toiletId={this.props.toiletId} 
               toilet={this.props.toilet}  
               getAllToilets={this.props.getAllToilets}/> 
            </div>
        )
    }
}
