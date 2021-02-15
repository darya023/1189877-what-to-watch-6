import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {films} from "./mocks/films";
import {user} from "./mocks/user";

const poster = films[0];

ReactDOM.render(
    <App films={films} poster={poster} user={user}/>,
    document.getElementById(`root`)
);
