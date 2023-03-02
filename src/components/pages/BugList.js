import React, { useState } from 'react';
import Navbar from '../Navbar';
import Task from '../Task';
import './BugList.css';

function BugList() {
    const [newTask, setNewTask] = useState('');
    const [taskList, setTaskList] = useState([]);

    const addNewTask = () => {
        if (!newTask) return;

        const newTaskList = [...taskList, {title: newTask, completed: false}];
        setTaskList(newTaskList);
        setNewTask('');
        document.getElementById('new-task-input').value = '';
    }    

    return (
        <>
            <Navbar />
            <div className='bl-screen'>
                <div className='bl-tasks'>
                    <h1>TASKS</h1>
                    <div className='new-task-input-container'>
                        <input id='new-task-input' className='new-task-input' type='text' placeholder='Enter New Task' onChange={(event) => {setNewTask(event.target.value);}}/>
                        <button type='submit' className='btn-create-task' onClick={addNewTask}>Create</button>
                    </div>
                    {taskList.map((task) => (
                        <Task task={task} />
                    ))}
                </div>
                <div className='bl-in-progress'></div>
                <div className='bl-done'></div>
            </div>
        </>
    )
}

export default BugList;