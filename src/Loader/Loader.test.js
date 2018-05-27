import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Loader from './Loader';
import Enzyme, { shallow } from 'enzyme';

describe('Loader', () => {
    const props = {
        name: 'loaderTest'
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Loader {...props} >Loading...</Loader>, div);
    });

    it('contains expected child element', () => {
        const component = shallow(
            <Loader {...props}>Loading...</Loader>
        );
        expect(component.children()).toEqual('Loading...');
    });
});