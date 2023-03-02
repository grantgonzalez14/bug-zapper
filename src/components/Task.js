import React from 'react';
import './Task.css';

function Task({task}) {
    return (
        <>
            <div className='task-item'>
                <ul>
                    <li>{task.title}</li>
                </ul>
                <select className='dropdown-menu'>
                    <option value='Status' selected>To-Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Resolved'>Resolved</option>
                </select>
                <button className='btn-remove-task'>Remove</button>
            </div>
        </>
    )
}

export default Task;