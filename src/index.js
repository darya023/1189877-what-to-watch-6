import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./components/app/app";
import {users} from "./mocks/users";
import {createAPI} from "./services/api";
import {ActionCreator} from "./store/action-creator";
import {checkAuthorization} from "./store/api-actions";
import {reducer} from "./store/reducer";

const api = createAPI(
    () => store.dispatch(ActionCreator.changeAuthorizationStatus(false))
);
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(checkAuthorization());

ReactDOM.render(
    <Provider store={store} >
      <App
        users={users}
      />
    </Provider>,
    document.getElementById(`root`)
);
