import React from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainScreen from "../main-screen/main-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import MyListScreen from "../my-list-screen/my-list-screen";
import SignInScreen from "../sign-in-screen/sign-in-screen";
import PlayerScreen from "../player-screen/player-screen";
import FilmScreen from "../film-screen/film-screen";
import AddReviewScreen from "../add-review-screen/add-review-screen";
import {filmProps, userProps} from "../../utils/prop-types";


const App = ({films, poster, user}) => {
  const favoriteFilms = films.filter((film) => film.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={
            (props)=>(<MainScreen {...props} films={films} poster={poster} user={user}/>)
          }
        />
        <Route path="/login" exact component={SignInScreen} />
        <Route
          path="/mylist"
          exact
          render={
            (props)=>(<MyListScreen {...props} films={favoriteFilms} user={user} />)
          }
        />
        <Route
          path="/player/:id"
          exact
          render={
            (props)=>(<PlayerScreen {...props} films={films} />)
          }
        />
        <Route
          path="/films/:id"
          exact
          render={
            (props)=>(<FilmScreen {...props} films={films} user={user} />)
          }
        />
        <Route
          path="/films/:id/review"
          exact
          render={
            (props)=>(<AddReviewScreen {...props} films={films} user={user} />)
          }
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
  poster: PropTypes.shape(filmProps),
  user: PropTypes.shape(userProps),
};

export default App;
