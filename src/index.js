import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {films} from "./mocks/films";
import {users} from "./mocks/users";

const poster = films[0];
const user = users[0];

ReactDOM.render(
    <App films={films} poster={poster} user={user} users={users} />,
    document.getElementById(`root`)
);
