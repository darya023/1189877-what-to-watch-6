import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {APIRoute, DataType, LoadingStatus} from "../../const";
import {createAPI} from '../../services/api';
import {adaptDataToClient} from "../../utils/adaptDataToClient";
import {changeAuthorizationStatus, setUser} from "../action-creator";
import {ActionType} from "../actions";
import {checkAuthorization, login} from "../api-actions";
import {user} from "./user";

const api = createAPI(() => {});
const fakeUser = {
  id: `1`,
  name: `User`,
  image: ``,
  email: ``
};
const fakeUserFromServer = {
  "id": 1,
  "name": `User`,
  "avatar_url": ``,
  "email": ``
};

describe(`User reducers work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: false,
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
describe(`Async operations work correctly: user`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.USER);
    const fakeFormData = {email: `asd@test.ru`, password: `testpass`};
    const loginHandler = login(fakeFormData);

    loginHandler(dispatch, () => {}, api);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CHANGE_SENDING_DATA_STATUS,
      payload: LoadingStatus.FETCHING,
    });

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, fakeUserFromServer);

    axios
      .get(APIRoute.LOGIN)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeUserFromServer);

        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.FAILURE,
        });
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: false,
        });
      });
  });
  it(`Should make a correct API call to /login for check authorization`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.USER);
    const checkAuthorizationHandler = checkAuthorization();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, fakeUserFromServer);

    checkAuthorizationHandler(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeUserFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
      });
  });
});
