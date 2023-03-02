import React from 'react';
import Navbar from '../Navbar';
import './BugList.css';

function BugList() {
  return (
    <>
        <Navbar />
        <div className='bl-screen'>
            <div className='bl-tasks'>
                <h1>TASKS</h1>
                <input className='new-task-input' type='text' placeholder='Enter New Task' />
            </div>
            <div className='bl-in-progress'></div>
            <div className='bl-done'></div>
        </div>
    </>
  )
}

export default BugList;