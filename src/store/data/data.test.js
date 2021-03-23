import {changeCurrentFilmID, changeIsSendingData, loadFilms, loadPoster, updateFilm} from "../action-creator";
import {data} from "./data";
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {ActionType} from '../actions';
import {fetchFilms, fetchPoster, toggleIsFavoriteKey} from '../api-actions';
import {APIRoute, DataType} from '../../const';
import {adaptDataToClient} from "../../utils/adaptDataToClient";
import axios from "axios";

const api = createAPI(() => {});
const fakeFilms = [
  {
    id: `1`,
    title: `The Grand Budapest Hotel`,
    image: ``,
    poster: ``,
    backgroundImage: ``,
    backgroundColor: `blue`,
    genre: `Drama`,
    year: 2014,
    video: ``,
    promoVideo: ``,
    description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`],
    duration: 120,
    rating: 7.5,
    reviewsCount: 3,
    isFavorite: false,
  },
  {
    id: `2`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    image: ``,
    poster: ``,
    backgroundImage: ``,
    backgroundColor: `blue`,
    genre: `Fantasy`,
    year: 2018,
    video: ``,
    promoVideo: ``,
    description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`],
    duration: 120,
    rating: 7.5,
    reviewsCount: 3,
    isFavorite: true,
  }
];
const fakeFilmsFromServer = [
  {
    "id": 1,
    "name": `The Grand Budapest Hotel`,
    "preview_image": ``,
    "poster_image": ``,
    "background_image": ``,
    "background_color": `blue`,
    "genre": `Drama`,
    "released": 2014,
    "video_link": ``,
    "preview_video_link": ``,
    "description": `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
    "director": `Wes Andreson`,
    "starring": [`Bill Murray`, `Edward Norton`],
    "run_time": 120,
    "rating": 7.5,
    "scores_count": 3,
    "is_favorite": false,
  },
  {
    "id": 2,
    "name": `Fantastic Beasts: The Crimes of Grindelwald`,
    "preview_image": ``,
    "poster_image": ``,
    "background_image": ``,
    "background_color": `blue`,
    "genre": `Fantasy`,
    "released": 2018,
    "video_link": ``,
    "preview_video_link": ``,
    "description": `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
    "director": `Wes Andreson`,
    "starring": [`Bill Murray`, `Edward Norton`],
    "run_time": 120,
    "rating": 7.5,
    "scores_count": 3,
    "is_favorite": true,
  }
];
const fakeFilm = {
  id: `1`,
  title: `The Grand Budapest Hotel`,
  image: ``,
  poster: ``,
  backgroundImage: ``,
  backgroundColor: `blue`,
  genre: `Drama`,
  year: 2014,
  video: ``,
  promoVideo: ``,
  description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  duration: 120,
  rating: 7.5,
  reviewsCount: 3,
  isFavorite: false,
};
const fakeFilmFromServer = {
  "id": 1,
  "name": `The Grand Budapest Hotel`,
  "preview_image": ``,
  "poster_image": ``,
  "background_image": ``,
  "background_color": `blue`,
  "genre": `Drama`,
  "released": 2014,
  "video_link": ``,
  "preview_video_link": ``,
  "description": `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
  "director": `Wes Andreson`,
  "starring": [`Bill Murray`, `Edward Norton`],
  "run_time": 120,
  "rating": 7.5,
  "scores_count": 3,
  "is_favorite": false,
};
const initialState = {
  films: [],
  poster: null,
  isFilmsLoaded: false,
  isPosterLoaded: false,
  isSendingData: false,
  currentFilmID: null,
};

describe(`Date reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(data(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should set loaded films and change isFilmsLoaded status`, () => {
    const expectedState = {
      films: fakeFilms,
      poster: null,
      isFilmsLoaded: true,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: null,
    };

    expect(data(initialState, loadFilms(fakeFilms))).toEqual(expectedState);
  });
  it(`Reducer should set loaded poster and change isPosterLoaded status`, () => {
    const expectedState = {
      films: [],
      poster: fakeFilm,
      isFilmsLoaded: false,
      isPosterLoaded: true,
      isSendingData: false,
      currentFilmID: null,
    };

    expect(data(initialState, loadPoster(fakeFilm))).toEqual(expectedState);
  });
  it(`Reducer should change isSendingData status`, () => {
    const expectedState = {
      films: [],
      poster: null,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: true,
      currentFilmID: null,
    };

    expect(data(initialState, changeIsSendingData(true))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      films: [],
      poster: null,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: null,
    };

    expect(data(initialState, changeIsSendingData(false))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change current film id`, () => {
    const id = `1`;
    const expectedState = {
      films: [],
      poster: null,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: id,
    };

    expect(data(initialState, changeCurrentFilmID(id))).toEqual(expectedState);

    const initialStateForSameID = {
      films: [],
      poster: null,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: id,
    };

    expect(data(initialStateForSameID, changeCurrentFilmID(id))).toEqual(expectedState);
  });
  it(`Reducer should update film`, () => {
    const updatedFilm = {
      id: `1`,
      title: `The Grand Budapest Hotel`,
      image: ``,
      poster: ``,
      backgroundImage: ``,
      backgroundColor: `blue`,
      genre: `Drama`,
      year: 2014,
      video: ``,
      promoVideo: ``,
      description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
      director: `Wes Andreson`,
      starring: [`Bill Murray`, `Edward Norton`],
      duration: 120,
      rating: 7.5,
      reviewsCount: 3,
      isFavorite: true,
    };
    const expectedFilms = [
      {
        id: `1`,
        title: `The Grand Budapest Hotel`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        backgroundColor: `blue`,
        genre: `Drama`,
        year: 2014,
        video: ``,
        promoVideo: ``,
        description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      },
      {
        id: `2`,
        title: `Fantastic Beasts: The Crimes of Grindelwald`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        backgroundColor: `blue`,
        genre: `Fantasy`,
        year: 2018,
        video: ``,
        promoVideo: ``,
        description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      }
    ];
    const expectedState = {
      films: expectedFilms,
      poster: null,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: null,
    };
    const testInitialState = {
      films: fakeFilms,
      poster: null,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: null,
    };

    expect(data(testInitialState, updateFilm(updatedFilm))).toEqual(expectedState);
    const expectedStateForPoster = {
      films: expectedFilms,
      poster: updatedFilm,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: null,
    };
    const initialStateForPoster = {
      films: fakeFilms,
      poster: fakeFilm,
      isFilmsLoaded: false,
      isPosterLoaded: false,
      isSendingData: false,
      currentFilmID: null,
    };

    expect(data(initialStateForPoster, updateFilm(updatedFilm))).toEqual(expectedStateForPoster);
    expect(data(testInitialState, updateFilm({}))).toEqual(testInitialState);
  });
});

describe(`Async operations work correctly: data`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const filmsLoader = fetchFilms();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, fakeFilmsFromServer);

    filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(2);
        expect(adaptData).toHaveBeenNthCalledWith(1, fakeFilmsFromServer[0], 0, fakeFilmsFromServer);
        expect(adaptData).toHaveBeenNthCalledWith(2, fakeFilmsFromServer[1], 1, fakeFilmsFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: fakeFilms,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_GENRES,
          payload: fakeFilms,
        });
      });
  });
  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const posterLoader = fetchPoster();

    apiMock
      .onGet(APIRoute.POSTER)
      .reply(200, fakeFilmFromServer);

    posterLoader(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeFilmFromServer);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_POSTER,
          payload: fakeFilm,
        });
      });
  });
  it(`Should make a correct API call to /favorite/:id/:status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const fakeUpdate = {id: `1`, isFavorite: true};
    const isFavoriteToggler = toggleIsFavoriteKey(fakeUpdate);

    isFavoriteToggler(dispatch, () => {}, api);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CHANGE_IS_SENDING,
      payload: true,
    });

    apiMock
      .onPost(`${APIRoute.FAVORITE}/1/0}`)
      .reply(200, fakeFilmFromServer)
      
    axios.get(`${APIRoute.FAVORITE}/1/0}`)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeFilmFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FILM,
          payload: fakeFilm,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_IS_SENDING,
          payload: false,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_IS_SENDING,
          payload: false,
        });
      });
  });
});
