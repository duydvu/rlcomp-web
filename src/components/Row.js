import React from 'react';
import './Row.css';

function Row(props) {
    return (
        <div className='map--row'>
            {props.children}
        </div>
    )
}

export default Row;
