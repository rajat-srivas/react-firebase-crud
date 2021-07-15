import React from 'react'
import './comment.style.scss';

const CommentItem = ({ item }) => (
    <div className="comment-item">
        <div className="comments">
            <img src={item.profilePic} alt="" />
            <span>{item.text}</span>
        </div>
    </div>

);

export default CommentItem;