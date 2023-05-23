import React from 'react';
import Tag from './Tag.js';
import { updateTags } from '../Firebase.js';
import './Task.css';

function Task({task, removeFunction, changeStatusFunction, updateFunction}) {
    const updateTagList = (tagName, updateType) => {
        let tagList = task.tags;
        
        if (updateType === 'delete') {
            let tagIndex = tagList.indexOf(tagName);
            tagList.splice(tagIndex, 1);
        }
        else if (updateType === 'add') {
            let tagName = window.prompt('Enter a new tag name');
            if (tagName.length < 1) return;
            if (tagList === undefined) tagList = [];
            tagList.push(tagName);
        }

        updateTags(task, tagList);

        // Update function is used to refresh the page after
        // a tag is added or removed
        updateFunction();
    }

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
                    <button className='add-tag' onClick={() => updateTagList('', 'add')}>+</button>
                    <p><strong>Tags:</strong></p>
                    {(task.tags === undefined || task.tags.length === 0) && <p>&nbsp;None</p>}
                    {(task.tags !== undefined && task.tags.length > 0) && task.tags.map((tag, index) => (
                        <Tag key={index} name={tag} removeFunction={updateTagList} task={task} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Task;