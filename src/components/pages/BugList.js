import React from 'react';
import { Button } from '../Button';
import Navbar from '../Navbar';
import './BugList.css';

function BugList() {
  return (
    <>
        <Navbar />
        <div className='bl-screen'>
            <div className='bl-tasks'>
                <h1>TASKS</h1>
                <div className='new-task-input-container'>
                    <input className='new-task-input' type='text' placeholder='Enter New Task' />
                    <Button buttonStyle='btn--task'>Create</Button>
                </div>
            </div>
            <div className='bl-in-progress'></div>
            <div className='bl-done'></div>
        </div>
    </>
  )
}

export default BugList;