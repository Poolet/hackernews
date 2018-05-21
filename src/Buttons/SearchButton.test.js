import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import SearchButton from './SearchButton';
import Enzyme, { shallow, mount, render } from 'enzyme';

describe('SearchButton', () => {
  const mockSubmit = jest.fn();
  const mockChange = jest.fn();
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchButton onSubmit={mockSubmit}>Search</SearchButton>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has a valid snapshot', () => {
    const component = renderer.create(
      <SearchButton onSubmit={mockSubmit}>Search</SearchButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the onSubmit method when submitted', () => {
    const component = shallow(<SearchButton onSubmit={mockSubmit}>Search</SearchButton>);
    component.find('form').simulate('submit');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('has one form', () => {
    const component = shallow(<SearchButton onSubmit={mockSubmit}>Search</SearchButton>);
    expect(component.find('form').length).toEqual(1);
  });

  it('has one button', () => {
    const component = shallow(<SearchButton onSubmit={mockSubmit}>Search</SearchButton>);
    expect(component.find('input').length).toEqual(1);
  });

  it('calls the onChange method when changed', () => {
    const component = mount(<SearchButton onChange={mockChange}>Search</SearchButton>);
    component.find('input').simulate('change');
    expect(mockChange).toHaveBeenCalledTimes(1);
  })
});
