import React , { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, addNewTask, getTaskList, removeTask, changeTaskStatus } from '../../../Firebase';
import Task from '../../Task';
import '../BugList.css';

function BugListTasks({active}) {
    const navigate = useNavigate();

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [taskList, setTaskList] = useState({
        toDo: [],
        inProgress: [],
        resolved: []
    });

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

    const changeStatus = (taskData, newStatus) => {
        changeTaskStatus(taskData, newStatus)
            .then(() => {
                getTaskList().then((tasks) => setTaskList(tasks));
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getTaskList().then((tasks) => setTaskList(tasks));
            }
            else {
                navigate('/sign-in');
            }
        });
    }, [navigate]);

    return (
        <>
            {active &&
                <div className='bl-tasks'>
                    <h1>BUGS</h1>
                    <div className='new-task-input-container'>
                        <input id='new-task-input' className='new-task-input' type='text' placeholder='Enter New Task' onChange={(event) => {setNewTaskTitle(event.target.value);}}/>
                        <button type='submit' className='btn-create-task' onClick={createNewTask}>Create</button>
                    </div>
                    {taskList.toDo.length === 0 && <h1 className='empty-task-list'>Nothing to do here!</h1>}
                    {taskList.toDo.map((task, index) => (
                        <Task task={task} key={index} removeFunction={deleteTask} changeStatusFunction={changeStatus}/>
                    ))}
                </div>
            }
</>
    )
}

export default BugListTasks;