import React from 'react';
import './task.style.scss';
import TaskItem from '../task-item/task-item.component'

const Tasks = ({ tasks, onDelete }) => (
    <div className="all-taks">
        {
            tasks.map((item) => <TaskItem key={item.id} {...item} onDelete={onDelete} />)
        }
    </div>
);

export default Tasks