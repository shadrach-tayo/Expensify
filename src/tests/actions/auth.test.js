import { login, logout } from '../../actions/auth';

test('should set uid for login', () => {
  const action = login('123');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '123'
  });
});

test('should clear uid for logout', () => {
  const action = logout('123');
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
