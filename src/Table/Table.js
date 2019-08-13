import React from 'react';
import { Button } from '../Buttons';
import { Sort } from '../Sort';
import PropTypes from 'prop-types';

const largeColumn = {
    width: '40%',
};

const midColumn = {
    width: '30%',
};

const smallColumn = {
    width: '10%',
};

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

const Table = ({ list, onDismiss, onSort }) =>
    <div className="table">
        {list.map(item =>
            <div className="table-header">
                <span style={{ width: '40%' }}>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={onSort}
                    >
                        Title
          </Sort>
                </span>
                <span style={{ width: '30%' }}>
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                    >
                        Author
          </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                    >
                        Comments
          </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={onSort}
                    >
                        Points
          </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    Archive
        </span>
            </div>
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

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
}

export default Table