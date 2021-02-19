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
import {userProps} from "../user/user.prop";
import {filmProps} from "../film-screen/film-screen.prop";

const App = ({films, poster, user}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={
            ()=>(<MainScreen films={films} poster={poster} user={user}/>)
          }
        />
        <Route path="/login" exact component={SignInScreen} />
        <Route
          path="/mylist"
          exact
          render={
            ()=>{
              const favoriteFilms = films.filter((film) => film.isFavorite);

              return <MyListScreen films={favoriteFilms} user={user} />;
            }
          }
        />
        <Route
          path="/player/:id"
          exact
          render={
            (props)=>{
              const id = props.match.params.id;
              const currentFilm = films.find((film) => film.id === id);

              return currentFilm ? <PlayerScreen title={currentFilm.title} image={currentFilm.image} video={currentFilm.video} /> : <NotFoundScreen />;
            }
          }
        />
        <Route
          path="/films/:id"
          exact
          render={
            (props)=>{
              const id = props.match.params.id;
              const currentFilm = films.find((film) => film.id === id);

              return currentFilm ? <FilmScreen currentFilmId={id} films={films} user={user} /> : <NotFoundScreen />;
            }
          }
        />
        <Route
          path="/films/:id/review"
          exact
          render={
            (props)=> {
              const id = props.match.params.id;
              const currentFilm = films.find((film) => film.id === id);

              return currentFilm ? <AddReviewScreen id={currentFilm.id} title={currentFilm.title} poster={currentFilm.poster} backgroundImage={currentFilm.backgroundImage} user={user} /> : <NotFoundScreen />;
            }
          }
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  films: PropTypes.arrayOf(
      PropTypes.shape(filmProps)
  ),
  poster: PropTypes.shape(filmProps),
  user: PropTypes.shape(userProps),
};

export default App;
