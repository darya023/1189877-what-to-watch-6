import {changeCurrentFilmID, changeLoadingFilmsStatus, changeLoadingFilmStatus, changeLoadingPosterStatus, changeSendingDataStatus, loadFilms, loadPoster, updateFilm} from "../action-creator";
import {data} from "./data";
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {ActionType} from '../actions';
import {fetchFilm, fetchFilms, fetchPoster, fetchReviews, sendReview, toggleIsFavoriteKey} from '../api-actions';
import {DataType, LoadingStatus} from '../../const';
import {adaptDataToClient} from "../../utils/adaptDataToClient";
import axios from "axios";
import {adaptDataToServer} from "../../utils/adaptDataToServer";

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
  currentFilmReviews: [],
  poster: null,
  posterLoadingStatus: LoadingStatus.INITIAL,
  filmLoadingStatus: LoadingStatus.INITIAL,
  filmsLoadingStatus: LoadingStatus.INITIAL,
  sendingDataStatus: LoadingStatus.INITIAL,
  currentFilmID: null,
  currentFilm: null,
};
const fakeReviewsFromServer = [
  {
    comment: `Test 1`,
    date: `2021-02-23T08:04:28.658Z`,
    id: 1,
    rating: 3.2,
    user: {
      id: 19,
      name: `Test1`
    }
  },
  {
    comment: `Test 2`,
    date: `2020-02-03T08:00:28.000Z`,
    id: 1,
    rating: 7,
    user: {
      id: 2,
      name: `Test2`
    }
  }
];
const fakeReviews = [
  {
    text: `Test 1`,
    date: `2021-02-23T08:04:28.658Z`,
    id: `1`,
    rating: 3.2,
    authorId: `19`,
    authorName: `Test1`
  },
  {
    text: `Test 2`,
    date: `2020-02-03T08:00:28.000Z`,
    id: `1`,
    rating: 7,
    authorId: `2`,
    authorName: `Test2`
  }
];

afterEach(() => {
  jest.clearAllMocks();
});
describe(`Date reducers work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(data(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should set loaded films`, () => {
    const expectedState = {
      ...initialState,
      films: fakeFilms,
    };

    expect(data(initialState, loadFilms(fakeFilms))).toEqual(expectedState);
  });
  it(`Reducer should set loaded poster`, () => {
    const expectedState = {
      ...initialState,
      poster: fakeFilm,
    };

    expect(data(initialState, loadPoster(fakeFilm))).toEqual(expectedState);
  });
  it(`Reducer should change sendingDataStatus`, () => {
    const expectedState = {
      ...initialState,
      sendingDataStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeSendingDataStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      sendingDataStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeSendingDataStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change filmsLoadingStatus`, () => {
    const expectedState = {
      ...initialState,
      filmsLoadingStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeLoadingFilmsStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      filmsLoadingStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeLoadingFilmsStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change filmLoadingStatus`, () => {
    const expectedState = {
      ...initialState,
      filmLoadingStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeLoadingFilmStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      filmLoadingStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeLoadingFilmsStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change posterLoadingStatus`, () => {
    const expectedState = {
      ...initialState,
      posterLoadingStatus: LoadingStatus.SUCCESS,
    };

    expect(data(initialState, changeLoadingPosterStatus(LoadingStatus.SUCCESS))).toEqual(expectedState);

    const expectedStateAsInitialState = {
      ...initialState,
      posterLoadingStatus: LoadingStatus.INITIAL,
    };

    expect(data(initialState, changeLoadingPosterStatus(LoadingStatus.INITIAL))).toEqual(expectedStateAsInitialState);
  });
  it(`Reducer should change current film id`, () => {
    const id = `1`;
    const expectedState = {
      ...initialState,
      currentFilmID: id,
    };

    expect(data(initialState, changeCurrentFilmID(id))).toEqual(expectedState);

    const initialStateForSameID = {
      ...initialState,
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
      ...initialState,
      films: expectedFilms,
      currentFilm: updatedFilm
    };
    const testInitialState = {
      ...initialState,
      films: fakeFilms,
      currentFilm: {},
    };

    expect(data(testInitialState, updateFilm(updatedFilm))).toEqual(expectedState);
    const expectedStateForPoster = {
      ...initialState,
      films: expectedFilms,
      poster: updatedFilm,
      currentFilm: updatedFilm,
    };
    const initialStateForPoster = {
      ...initialState,
      films: fakeFilms,
      poster: fakeFilm,
    };

    expect(data(initialStateForPoster, updateFilm(updatedFilm))).toEqual(expectedStateForPoster);
    expect(data(testInitialState, updateFilm({}))).toEqual(testInitialState);
  });
});

describe(`Async operations work correctly: data`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const filmsLoader = fetchFilms();

    filmsLoader(dispatch, () => {}, api);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CHANGE_FILMS_LOADING_STATUS,
      payload: LoadingStatus.FETCHING,
    });

    apiMock
      .onGet(`/films`)
      .reply(200, fakeFilmsFromServer);

    axios.get(`/films`)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(2);
        expect(adaptData).toHaveBeenNthCalledWith(1, fakeFilmsFromServer[0], 0, fakeFilmsFromServer);
        expect(adaptData).toHaveBeenNthCalledWith(2, fakeFilmsFromServer[1], 1, fakeFilmsFromServer);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: fakeFilms,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_GENRES,
          payload: fakeFilms,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_FILMS_LOADING_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_FILMS_LOADING_STATUS,
          payload: LoadingStatus.FAILURE,
        });
      });
  });
  it(`Should make a correct API call to /films for update film`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const id = `1`;
    const filmLoader = fetchFilm(id);

    filmLoader(dispatch, () => {}, api);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CHANGE_FILM_LOADING_STATUS,
      payload: LoadingStatus.FETCHING,
    });

    apiMock
      .onGet(`/films/${1}`)
      .reply(200, fakeFilmFromServer);

    axios.get(`/films/${1}`)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenNthCalledWith(1, fakeFilmFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FILM,
          payload: fakeFilm,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_FILM_LOADING_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_FILM_LOADING_STATUS,
          payload: LoadingStatus.FAILURE,
        });
      });
  });
  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const id = `1`;
    const reviewsLoader = fetchReviews(id);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, fakeReviewsFromServer);

    reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(2);
        expect(adaptData).toHaveBeenNthCalledWith(1, fakeReviewsFromServer[0], 0, fakeReviewsFromServer);
        expect(adaptData).toHaveBeenNthCalledWith(1, fakeReviewsFromServer[1], 1, fakeReviewsFromServer);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: fakeReviews,
        });
      });
  });
  it(`Should make a correct API call to /comments/:id for send review`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptTestDataToServer = jest.spyOn(adaptDataToServer, DataType.REVIEWS);
    const adaptTestDataToClient = jest.spyOn(adaptDataToClient, DataType.REVIEWS);
    const id = `1`;
    const formData = {review: `Test 1`, rating: 3.2};
    const reviewHandler = sendReview(formData, id);


    reviewHandler(dispatch, () => {}, api);

    expect(adaptTestDataToServer).toHaveBeenCalledTimes(1);
    expect(adaptTestDataToServer).toHaveBeenNthCalledWith(1, formData);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CHANGE_SENDING_DATA_STATUS,
      payload: LoadingStatus.FETCHING,
    });

    apiMock
      .onPost(`comments/${id}`)
      .reply(200, fakeReviewsFromServer);

    axios.get(`comments/${id}`)
      .then(() => {
        expect(adaptTestDataToClient).toHaveBeenCalledTimes(2);
        expect(adaptTestDataToClient).toHaveBeenNthCalledWith(1, fakeReviewsFromServer[0], 0, fakeReviewsFromServer);
        expect(adaptTestDataToClient).toHaveBeenNthCalledWith(2, fakeReviewsFromServer[1], 1, fakeReviewsFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: fakeReviews,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.FAILURE,
        });
      });
  });
  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const posterLoader = fetchPoster();

    posterLoader(dispatch, () => {}, api);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CHANGE_POSTER_LOADING_STATUS,
      payload: LoadingStatus.FETCHING,
    });

    apiMock
      .onGet(`/films/promo`)
      .reply(200, fakeFilmFromServer);

    axios.get(`/films/promo`)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeFilmFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_POSTER,
          payload: fakeFilm,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_POSTER_LOADING_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_POSTER_LOADING_STATUS,
          payload: LoadingStatus.FAILURE,
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
      type: ActionType.CHANGE_SENDING_DATA_STATUS,
      payload: LoadingStatus.FETCHING,
    });

    apiMock
      .onPost(`/favorite/1/0}`)
      .reply(200, fakeFilmFromServer);

    axios.get(`/favorite/1/0}`)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeFilmFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FILM,
          payload: fakeFilm,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
      })
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.FAILURE,
        });
      });
  });
});
