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
