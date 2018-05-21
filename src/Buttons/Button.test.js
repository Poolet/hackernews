import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Button from './Button';
import Enzyme, { shallow } from 'enzyme';

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Test</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(
      <Button>Test</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has one child', () => {
    const element = shallow(<Button>Test</Button>)
    expect(element.children()).toHaveLength(1);
  });

  it ('calls the passed on click handler once when clicked', () => {
    const fakeMethod = jest.fn();
    const element = shallow(<Button onClick={fakeMethod}>Test</Button>);
    expect(fakeMethod).toHaveBeenCalledTimes(0)
    element.simulate('click');
    expect(fakeMethod).toHaveBeenCalledTimes(1);
  });
  
});
