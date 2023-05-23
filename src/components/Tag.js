import React from 'react';
import './Tag.css';

function Tag({name, removeFunction}) {
    return (
        <>
            <div className='tag-container'>
                <button className='remove-tag' onClick={() => removeFunction(name, 'delete')}>X</button>
                {name}
            </div>
        </>
    );
}

export default Tag;