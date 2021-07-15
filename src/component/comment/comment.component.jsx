import React from 'react'
import './comment.style.scss';

const CommentItem = ({ item, currentUser, handleDelete, handleEdit }) => (
    <div className="comment-item">
        <div className="comments">
            <img src={item.profilePic} alt="" />
            <span>{item.text}</span>
            {
                currentUser && currentUser.email === item.author ?
                    <div className="icons showOnHover"  >
                        <span onClick={() => handleDelete(item.id)} className="delete">&#10006;</span>
                        <span onClick={() => handleEdit(item.id, item.text)} className="edit">&#9998;</span>
                    </div> : ''
            }
        </div>
    </div >

);

export default CommentItem;