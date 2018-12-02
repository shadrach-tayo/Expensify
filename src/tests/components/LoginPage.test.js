import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { LoginPage } from '../../components/LoginPage';

let wrapper, startLogin;
beforeEach(() => {
  startLogin = jest.fn();
  wrapper = shallow(<LoginPage startLogin={startLogin} />);
});

// react test renderer
test('should render LoginPage correctly', () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
