import {createReducer} from "@reduxjs/toolkit";
import {changeAuthorizationStatus, setUser} from "../action-creator";

const initialState = {
  authorizationStatus: false,
  user: null,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(changeAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
  });
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});

export {user};
