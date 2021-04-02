import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import User from './user.jsx';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';

const mockStore = configureStore({});
const history = createMemoryHistory();
const fakeDispatch = jest.fn();
jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

it(`App should logout if user click logout button`, () => {
  const fakeUser = {
    id: `1`,
    name: `User`,
    image: ``,
    email: `test@test.ru`
  };
  const store = mockStore({
    USER: {
      authorizationStatus: true,
      user: fakeUser,
    },
  });
  render(
      <Provider store={store}>
        <Router history={history}>
          <User />
        </Router>
      </Provider>
  );

  userEvent.click(screen.getByText(`Log out`));
  expect(fakeDispatch).toHaveBeenCalled();
});
