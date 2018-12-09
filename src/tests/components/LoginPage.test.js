import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { LoginPage } from '../../components/LoginPage';

let wrapper, startGoogleLogin, startTwitterLogin;
beforeEach(() => {
  startGoogleLogin = jest.fn();
  startTwitterLogin = jest.fn();
  wrapper = shallow(
    <LoginPage
      startGoogleLogin={startGoogleLogin}
      startTwitterLogin={startTwitterLogin}
    />
  );
});

// react test renderer
test('should render LoginPage correctly', () => {
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should call startGoogleLogin on button click', () => {
  wrapper.find('.btn__google').simulate('click');
  expect(startGoogleLogin).toHaveBeenCalled();
});

test('should call startTwitterLogin on button click', () => {
  wrapper.find('.btn__twitter').simulate('click');
  expect(startTwitterLogin).toHaveBeenCalled();
});
