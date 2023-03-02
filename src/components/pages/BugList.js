import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Task from '../Task';
import { auth, addNewTask, getTaskList } from '../../Firebase';
import './BugList.css';
import { onAuthStateChanged } from 'firebase/auth';

function BugList() {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [taskList, setTaskList] = useState([]);

    const createNewTask = () => {
        if (!newTaskTitle) return;

        const newTask = {title: newTaskTitle, completed: false};
        const newTaskList = [...taskList, newTask];

        setTaskList(newTaskList);
        setNewTaskTitle('');
        addNewTask(newTask);
        document.getElementById('new-task-input').value = '';
        
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getTaskList().then((tasks) => setTaskList(tasks));
            }
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className='bl-screen'>
                <div className='bl-tasks'>
                    <h1>BUGS</h1>
                    <div className='new-task-input-container'>
                        <input id='new-task-input' className='new-task-input' type='text' placeholder='Enter New Task' onChange={(event) => {setNewTaskTitle(event.target.value);}}/>
                        <button type='submit' className='btn-create-task' onClick={createNewTask}>Create</button>
                    </div>
                    {taskList.map((task, index) => (
                        <Task task={task} key={index}/>
                    ))}
                </div>
                <div className='bl-in-progress'>
                    <h1>IN PROGRESS</h1>
                </div>
                <div className='bl-done'>
                        <h1>BUGS ZAPPED</h1>
                </div>
            </div>
        </>
    )
}

export default BugList;