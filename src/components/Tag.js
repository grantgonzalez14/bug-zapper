import React from 'react';
import './Tag.css';

function Tag({name}) {
    return (
        <>
            <button className='tag-container'>{name}</button>
        </>
    );
}

export default Tag;