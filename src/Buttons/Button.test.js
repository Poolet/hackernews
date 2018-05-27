import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import Button from './Button';
import Enzyme, { shallow } from 'enzyme';

describe('Button', () => {
  const mockOnClick = jest.fn();
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button onClick={mockOnClick}>Test</Button>, div);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(
      <Button onClick={mockOnClick}>Test</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has one child', () => {
    const element = shallow(<Button onClick={mockOnClick}>Test</Button>)
    expect(element.children()).toHaveLength(1);
  });

  it('calls the passed on click handler once when clicked', () => {
    const element = shallow(<Button onClick={mockOnClick}>Test</Button>);
    expect(mockOnClick).toHaveBeenCalledTimes(0)
    element.simulate('click');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
