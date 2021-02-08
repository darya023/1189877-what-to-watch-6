import React from "react";
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainScreen from "../main/main";
import NotFoundScreen from "../not-found/not-found";
import MyListScreen from "../my-list/my-list";
import SignInScreen from "../sign-in/sign-in";
import PlayerScreen from "../player/player";
import FilmScreen from "../film/film";
import AddReviewScreen from "../add-review/add-review";
import {PropType} from "../../utils/const";

const App = ({movieCards, poster}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={
            (props)=>(<MainScreen {...props} movieCards={movieCards} poster={poster} />)
          }
        />
        <Route path="/login" exact component={SignInScreen} />
        <Route path="/mylist" exact component={MyListScreen} />
        <Route path="/player/:id" exact component={PlayerScreen} />
        <Route path="/films/:id" exact component={FilmScreen} />
        <Route path="/films/:id/review" exact component={AddReviewScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  movieCards: PropTypes.arrayOf(
      PropTypes.shape(PropType.MOVIE_CARD)
  ),
  poster: PropTypes.shape(PropType.POSTER)
};

export default App;
