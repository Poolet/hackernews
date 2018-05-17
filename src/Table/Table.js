import React from 'react';
import {Button} from '../Buttons'

const largeColumn = {
    width: '40%',
};

const midColumn = {
    width: '30%',
};

const smallColumn = {
    width: '10%',
};

const Table = ({ list, onDismiss }) =>
    <div className="table">
        {list.map(item =>
            <div key={item.objectID} className='table-row'>
                <span style={{ width: largeColumn }}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={{ width: midColumn }}>
                    {item.author}
                </span>
                <span style={{ width: smallColumn }}>
                    {item.num_comments}
                </span>
                <span style={{ width: smallColumn }}>
                    {item.points}
                </span>
                <span style={{ width: smallColumn }}>
                    <Button
                        onClick={() => onDismiss(item.objectID)}
                        className='button-inline'
                    >
                        Dismiss
    </Button>
                </span>
            </div>
        )}
    </div>

export default Table