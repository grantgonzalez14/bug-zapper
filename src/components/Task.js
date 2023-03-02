import React from 'react';
import { removeTask } from '../Firebase';
import './Task.css';

function Task({task, index}) {
    return (
        <>
            <div className='task-item'>
                <ul>
                    <li>{task.title}</li>
                </ul>
                <select className='dropdown-menu'>
                    <option defaultValue='To-Do'>To-Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Resolved'>Resolved</option>
                </select>
                <button className='btn-remove-task' onClick={() => removeTask(task)}>Remove</button>
            </div>
        </>
    )
}

export default Task;