import React , { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getTaskList, removeTask, changeTaskStatus } from '../../../Firebase';
import Task from '../../Task';
import '../BugList.css';

function BugListInProgress({active}) {
    const navigate = useNavigate();

    const [taskList, setTaskList] = useState({
        toDo: [],
        inProgress: [],
        resolved: []
    });

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
                <div className='bl-in-progress'>
                    <h1>IN PROGRESS</h1>
                    <div className='divider'></div>
                    {taskList.inProgress.length === 0 && <h1 className='empty-task-list'>Nothing to do here!</h1>}
                    {taskList.inProgress.map((task, index) => (
                        <Task task={task} key={index} removeFunction={deleteTask} changeStatusFunction={changeStatus}/>
                    ))}
                </div>
            }
        </>
    )
}

export default BugListInProgress;