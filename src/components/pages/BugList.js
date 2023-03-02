import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Task from '../Task';
import { auth, addNewTask, getTaskList, removeTask } from '../../Firebase';
import './BugList.css';
import { onAuthStateChanged } from 'firebase/auth';

function BugList() {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [taskList, setTaskList] = useState([]);

    const createNewTask = () => {
        if (!newTaskTitle) return;

        setNewTaskTitle('');
        addNewTask({title: newTaskTitle, completed: false});
        getTaskList().then((tasks) => setTaskList(tasks));
        document.getElementById('new-task-input').value = '';
        
    }

    const deleteTask = (taskData) => {
        removeTask(taskData);
        getTaskList().then((tasks) => setTaskList(tasks));
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
                    {taskList.length === 0 && <h1 className='empty-task-list'>Nothing to do here!</h1>}
                    {taskList.map((task, index) => (
                        <Task task={task} index={index} key={index} callBackFunction={() => deleteTask(task)}/>
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