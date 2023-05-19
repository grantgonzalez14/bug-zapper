import React from 'react';
import Tag from './Tag.js';
import './Task.css';

function Task({task, removeFunction, changeStatusFunction}) {
    return (
        <>
            <div className='task-item-container'>
                <div className='task-item'>
                    <ul>
                        <li className={task.status === 'resolved' ? 'task-resolved' : 'task-not-resolved'}>{task.title}</li>
                    </ul>
                    {task.status === 'to-do' && 
                    <select className='dropdown-menu' onChange={(event) => changeStatusFunction(task, event.target.value)}>
                        <option value='to-do'>To-Do</option>
                        <option value='in-progress'>In Progress</option>
                        <option value='resolved'>Resolved</option>
                    </select>}
                    {task.status === 'in-progress' &&
                    <select className='dropdown-menu' onChange={(event) => changeStatusFunction(task, event.target.value)}>
                        <option value='in-progress'>In Progress</option>
                        <option value='to-do'>To-Do</option>
                        <option value='resolved'>Resolved</option>
                    </select>}
                    {task.status === 'resolved' &&
                    <select className='dropdown-menu' onChange={(event) => changeStatusFunction(task, event.target.value)}>
                        <option value='resolved'>Resolved</option>
                        <option value='to-do'>To-Do</option>
                        <option value='in-progress'>In Progress</option>
                    </select>}
                    <button className='btn-remove-task' onClick={() => removeFunction(task)}>Remove</button>
                </div>
                <div className='tags'>
                    <p><strong>Tags:&nbsp;&nbsp;</strong></p>
                    <Tag name={'this is a Priority tag here'} />
                </div>
            </div>
        </>
    )
}

export default Task;