import authReducer from '../../reducers/auth';

test('should return default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should login state', () => {
  const state = authReducer(undefined, { type: 'LOGIN', uid: '123' });
  expect(state).toEqual({
    uid: '123'
  });
});

test('should return logout state', () => {
  const state = authReducer(undefined, { type: 'LOGOUT' });
  expect(state).toEqual({});
});
