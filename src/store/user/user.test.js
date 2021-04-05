import {changeAuthorizationStatus, setUser} from "../action-creator";
import {user} from "./user";

const fakeUser = {
  id: `1`,
  name: `User`,
  image: ``,
  email: ``
};

describe(`User reducers work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: null,
      user: null,
    };

    expect(user(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should change authorization status`, () => {
    const initialState = {
      authorizationStatus: false,
      user: null,
    };

    const expectedState = {
      authorizationStatus: true,
      user: null,
    };

    expect(user(initialState, changeAuthorizationStatus(true))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      authorizationStatus: false,
      user: null,
    };

    expect(user(initialState, changeAuthorizationStatus(false))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should set user`, () => {
    const initialState = {
      authorizationStatus: false,
      user: null,
    };

    const expectedState = {
      authorizationStatus: false,
      user: fakeUser,
    };

    expect(user(initialState, setUser(fakeUser))).toEqual(expectedState);
  });

});
