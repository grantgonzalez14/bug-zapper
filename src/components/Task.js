import React from 'react';
import './Task.css';

function Task({task}) {
    return (
        <>
            <div className='task-item'>
                <ul>
                    <li>{task.title}</li>
                </ul>
            </div>
        </>
    )
}

export default Task;