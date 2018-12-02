import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

let wrapper, startLogout;
beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

// react test renderer
test('should render Header correctly', () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
