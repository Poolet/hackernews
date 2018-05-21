import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Table from './Table';
import Enzyme, { shallow } from 'enzyme';

describe('Table', () => {
    const mockDismiss = jest.fn();
    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 1, objectID: 'y' },
            { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
        ],
        onDismiss: mockDismiss
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props} />, div);
    });

    it('has a valid snapshot', () => {
        const component = renderer.create(
            <Table {...props} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('shows two items in list', () => {
        const element = shallow(
            <Table {...props} />
        );
        expect(element.find('.table-row').length).toBe(2);
    });
});
