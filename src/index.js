import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {configureStore} from '@reduxjs/toolkit';
import App from "./components/app/app";
import {users} from "./mocks/users";
import {createAPI} from "./services/api";
import {changeAuthorizationStatus} from "./store/action-creator";
import {checkAuthorization} from "./store/api-actions";
import {redirect} from "./store/middlewares/redirect";
import rootReducer from "./store/root-reducer";
import {Router} from "react-router";
import browserHistory from "./browser-history";

const api = createAPI(
    () => store.dispatch(changeAuthorizationStatus(false))
);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
});

store.dispatch(checkAuthorization());

ReactDOM.render(
    <Provider store={store} >
      <Router history={browserHistory}>
        <App
          users={users}
        />
      </Router>
    </Provider>,
    document.getElementById(`root`)
);
