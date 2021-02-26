import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./components/app/app";
import {films} from "./mocks/films";
import {users} from "./mocks/users";
import {reducer} from "./store/reducer";

const user = users[0];
const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store} >
      <App
        films={films}
        user={user}
        users={users}
      />
    </Provider>,
    document.getElementById(`root`)
);
