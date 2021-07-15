import React from 'react';
import './task-item.style.scss'
import { updateTaskInFirebase } from '../../firebase-service.js'

const TaskItem = ({ id, title, description, updatedAt, completed, onDelete }) => (
    <article className="task-item">
        <span className=
            {`${!completed ? 'progress' : 'completed'} status-label`}>
            {completed ? 'Completed' : 'InProgress'}</span>

        <h2>{title}</h2>
        <h4>{description}</h4>
        <div className="status">
            {
                !completed ?
                    <div className="check">
                        <input type="checkbox" name="completed" id="" onChange={() => updateTaskInFirebase(id, completed)} />
                        <span>Mark Completed </span>
                    </div> : ''
            }
        </div>
        <div className="icons">
            <span onClick={() => onDelete(id)} className="delete">&#10006;</span>
        </div>
    </article>
)

export default TaskItem;