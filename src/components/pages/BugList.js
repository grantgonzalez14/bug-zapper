import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, addNewTask, getTaskList, removeTask, changeTaskStatus } from '../../Firebase';
import Navbar from '../Navbar';
import Task from '../Task';
import BugListTasks from './buglistmobile/BugListTasks';
import BugListInProgress from './buglistmobile/BugListInProgress';
import BugListResolved from './buglistmobile/BugListResolved';
import './BugList.css';

function BugList() {
    const navigate = useNavigate();

    const [onMobile, setOnMobile] = useState(isMobile);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [tasksActive, setTasksActive] = useState(onMobile);
    const [inProgressActive, setInProgressActive] = useState(false);
    const [resolvedActive, setResolvedActive] = useState(false);
    const [taskList, setTaskList] = useState({
        toDo: [],
        inProgress: [],
        resolved: []
    });

    const createNewTask = () => {
        if (!newTaskTitle) return;

        addNewTask({title: newTaskTitle, completed: false})
            .then(() => {
                setNewTaskTitle('');
                getTaskList().then((tasks) => setTaskList(tasks));
                document.getElementById('new-task-input').value = '';
            });
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

    const setActive = (page) => {
        if (page === 'tasks') {
            setInProgressActive(false);
            setResolvedActive(false);
            setTasksActive(true);
        }
        else if (page === 'in-progress') {
            setTasksActive(false);
            setResolvedActive(false);
            setInProgressActive(true);
        }
        else if (page === 'resolved') {
            setTasksActive(false);
            setInProgressActive(false);
            setResolvedActive(true);
        }
    }

    const updateList = () => {
        getTaskList().then((tasks) => setTaskList(tasks));
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

    useEffect(() => {
        const handleResize = () => {
            setOnMobile(window.innerWidth <= 960);
            setTasksActive(onMobile);
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [onMobile]);

    return (
        <>
            <Navbar />
            <div className='bl-screen'>
                {!onMobile && 
                    <div className='bl-tasks'>
                        <h1>BUGS</h1>
                        <div className='new-task-input-container'>
                            <input id='new-task-input' className='new-task-input' type='text' placeholder='Enter New Task' onChange={(event) => {setNewTaskTitle(event.target.value);}}/>
                            <button type='submit' className='btn-create-task' onClick={createNewTask}>Create</button>
                        </div>
                        {taskList.toDo.length === 0 && <h1 className='empty-task-list'>Nothing to do here!</h1>}
                        {taskList.toDo.map((task, index) => (
                            <Task task={task} key={index} removeFunction={deleteTask} changeStatusFunction={changeStatus} updateFunction={updateList}/>
                        ))}
                    </div>
                }
                {!onMobile &&
                    <div className='bl-in-progress'>
                        <h1>IN PROGRESS</h1>
                        <div className='divider'></div>
                        {taskList.inProgress.length === 0 && <h1 className='empty-task-list'>Nothing to do here!</h1>}
                        {taskList.inProgress.map((task, index) => (
                            <Task task={task} key={index} removeFunction={deleteTask} changeStatusFunction={changeStatus} updateFunction={updateList}/>
                        ))}
                    </div>
                }
                {!onMobile &&
                    <div className='bl-done'>
                        <h1>BUGS ZAPPED</h1>
                        <div className='divider'></div>
                        {taskList.resolved.length === 0 && <h1 className='empty-task-list'>Nothing to do here!</h1>}
                        {taskList.resolved.map((task, index) => (
                            <Task task={task} key={index} removeFunction={deleteTask} changeStatusFunction={changeStatus} updateFunction={updateList}/>
                        ))}
                    </div>
                }
                {onMobile &&
                    <>
                        <div className='page-selector-container'>
                            <button className={tasksActive ? 'page-selector-active btn-create-task' : 'page-selector btn-create-task'} onClick={() => setActive('tasks')}>Tasks</button>
                            <button className={inProgressActive ? 'page-selector-active btn-create-task' : 'page-selector btn-create-task'} onClick={() => setActive('in-progress')}>In Progress</button>
                            <button className={resolvedActive ? 'page-selector-active btn-create-task' : 'page-selector btn-create-task'} onClick={() => setActive('resolved')}>Bugs Zapped</button>
                        </div>
                        <BugListTasks active={tasksActive} />
                        <BugListInProgress active={inProgressActive} />
                        <BugListResolved active={resolvedActive} />
                    </>
                }
            </div>
        </>
    )
}

export default BugList;