import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Loader } from '../../components/Loader';

test('should render loader correctly', () => {
  const wrapper = shallow(<Loader />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
