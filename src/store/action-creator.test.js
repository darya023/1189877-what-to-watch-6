import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {ActionType} from './actions';
import {fetchFilm, fetchFilms, fetchPoster, fetchReviews, sendReview, toggleIsFavoriteKey, checkAuthorization, login, logout} from './api-actions';
import {DataType, LoadingStatus} from '../const';
import {adaptDataToClient} from "../utils/adaptDataToClient";
import {adaptDataToServer} from "../utils/adaptDataToServer";


const api = createAPI(() => {});
const fakeUser = {
  id: `1`,
  name: `User`,
  image: ``,
  email: ``
};
const fakeUserFromServer = {
  "id": 1,
  "name": `User`,
  "avatar_url": ``,
  "email": ``
};

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
describe(`Async operations work correctly`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const filmsLoader = fetchFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, fakeFilmsFromServer);

    filmsLoader(dispatch, () => {}, api)
    .then(() => {
      expect(adaptData).toHaveBeenCalledTimes(2);
      expect(adaptData).toHaveBeenNthCalledWith(1, fakeFilmsFromServer[0], 0, fakeFilmsFromServer);
      expect(adaptData).toHaveBeenNthCalledWith(2, fakeFilmsFromServer[1], 1, fakeFilmsFromServer);

      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILMS_LOADING_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_FILMS,
        payload: fakeFilms,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_GENRES,
        payload: fakeFilms,
      });
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.CHANGE_FILMS_LOADING_STATUS,
        payload: LoadingStatus.SUCCESS,
      });
    });
  });
  it(`Should catch error to API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = fetchFilms();

    apiMock
      .onGet(`/films`)
      .reply(500, {fake: `fake`});

    filmsLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILMS_LOADING_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_FILMS_LOADING_STATUS,
        payload: LoadingStatus.FAILURE,
      });
    });
  });
  it(`Should make a correct API call to /films for load film`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.FILMS);
    const id = `1`;
    const filmLoader = fetchFilm(id);

    apiMock
      .onGet(`/films/${id}`)
      .reply(200, fakeFilmFromServer);

    filmLoader(dispatch, () => {}, api)
    .then(() => {
      expect(adaptData).toHaveBeenCalledTimes(1);
      expect(adaptData).toHaveBeenNthCalledWith(1, fakeFilmFromServer);

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILM_LOADING_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_CURRENT_FILM,
        payload: fakeFilm,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_FILM_LOADING_STATUS,
        payload: LoadingStatus.SUCCESS,
      });
    });
  });
  it(`Should catch error to API call to /films for update film`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = `1`;
    const filmLoader = fetchFilm(id);

    apiMock
      .onGet(`/films/${1}`)
      .reply(500, {fake: `fake`});

    filmLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_FILM_LOADING_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_FILM_LOADING_STATUS,
        payload: LoadingStatus.FAILURE,
      });
    });
  });
  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.REVIEWS);
    const id = `1`;
    const reviewsLoader = fetchReviews(id);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, fakeReviewsFromServer);

    reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(2);
        expect(adaptData).toHaveBeenNthCalledWith(1, fakeReviewsFromServer[0], 0, fakeReviewsFromServer);
        expect(adaptData).toHaveBeenNthCalledWith(2, fakeReviewsFromServer[1], 1, fakeReviewsFromServer);

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

    apiMock
      .onPost(`comments/${id}`)
      .reply(200, fakeReviewsFromServer);

    reviewHandler(dispatch, () => {}, api)
    .then(() => {
      expect(adaptTestDataToServer).toHaveBeenCalledTimes(1);
      expect(adaptTestDataToServer).toHaveBeenNthCalledWith(1, formData);

      expect(adaptTestDataToClient).toHaveBeenCalledTimes(2);
      expect(adaptTestDataToClient).toHaveBeenNthCalledWith(1, fakeReviewsFromServer[0], 0, fakeReviewsFromServer);
      expect(adaptTestDataToClient).toHaveBeenNthCalledWith(2, fakeReviewsFromServer[1], 1, fakeReviewsFromServer);

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_REVIEWS,
        payload: fakeReviews,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.SUCCESS,
      });
    });
  });
  it(`Should catch error to API call to /comments/:id for send review`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptTestDataToServer = jest.spyOn(adaptDataToServer, DataType.REVIEWS);
    const id = `1`;
    const formData = {review: `Test 1`, rating: 3.2};
    const reviewHandler = sendReview(formData, id);

    apiMock
    .onPost(`comments/${id}`)
    .reply(500, {fake: `fake`});

    reviewHandler(dispatch, () => {}, api)
    .then(() => {
      expect(adaptTestDataToServer).toHaveBeenCalledTimes(1);
      expect(adaptTestDataToServer).toHaveBeenNthCalledWith(1, formData);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
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

    apiMock
      .onGet(`/films/promo`)
      .reply(200, fakeFilmFromServer);

    posterLoader(dispatch, () => {}, api)
    .then(() => {
      expect(adaptData).toHaveBeenCalledTimes(1);
      expect(adaptData).toHaveBeenCalledWith(fakeFilmFromServer);

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_POSTER_LOADING_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.LOAD_POSTER,
        payload: fakeFilm,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_POSTER_LOADING_STATUS,
        payload: LoadingStatus.SUCCESS,
      });
    });
  });
  it(`Should catch error to API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const posterLoader = fetchPoster();

    apiMock
      .onGet(`/films/promo`)
      .reply(500, {fake: `fake`});

    posterLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_POSTER_LOADING_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
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

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(200, fakeFilmFromServer);

    isFavoriteToggler(dispatch, () => {}, api)
    .then(() => {
      expect(adaptData).toHaveBeenCalledTimes(1);
      expect(adaptData).toHaveBeenCalledWith(fakeFilmFromServer);

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.UPDATE_FILM,
        payload: fakeFilm,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.SUCCESS,
      });
    });
  });
  it(`Should catch error to API call to /favorite/:id/:status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUpdate = {id: `1`, isFavorite: true};
    const isFavoriteToggler = toggleIsFavoriteKey(fakeUpdate);

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(500, {fake: `fake`});

    isFavoriteToggler(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FAILURE,
      });
    });
  });
  it(`Should catch error (401) to API call to /favorite/:id/:status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUpdate = {id: `1`, isFavorite: true};
    const isFavoriteToggler = toggleIsFavoriteKey(fakeUpdate);

    apiMock
      .onPost(`/favorite/1/0`)
      .reply(401, {fake: `fake`});

    isFavoriteToggler(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.REDIRECT_TO_ROUTE,
        payload: `/login`,
      });
    });
  });
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.USER);
    const fakeFormData = {email: `asd@test.ru`, password: `testpass`};
    const loginHandler = login(fakeFormData);

    apiMock
      .onPost(`/login`)
      .reply(200, fakeUserFromServer);

    loginHandler(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeUserFromServer);

        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.FETCHING,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_SENDING_DATA_STATUS,
          payload: LoadingStatus.SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`,
        });
      });
  });
  it(`Should catch error to API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeFormData = {email: `asd@test.ru`, password: `testpass`};
    const loginHandler = login(fakeFormData);

    apiMock
      .onPost(`/login`)
      .reply(500, {fake: `fake`});

    loginHandler(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: false,
      });
    });
  });
  it(`Should make a correct API call to /login for check authorization`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const adaptData = jest.spyOn(adaptDataToClient, DataType.USER);
    const checkAuthorizationHandler = checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(200, fakeUserFromServer);

    checkAuthorizationHandler(dispatch, () => {}, api)
      .then(() => {
        expect(adaptData).toHaveBeenCalledTimes(1);
        expect(adaptData).toHaveBeenCalledWith(fakeUserFromServer);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: fakeUser,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: true,
        });
      });
  });
  it(`Should catch error to API call to /login for check authorization`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorizationHandler = checkAuthorization();

    apiMock
      .onGet(`/login`)
      .reply(500, {fake: `fake`});

    checkAuthorizationHandler(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTHORIZATION_STATUS,
          payload: false,
        });
      });
  });
  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutHandler = logout();

    apiMock
      .onGet(`/logout`)
      .reply(200);

    logoutHandler(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(6);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_USER,
        payload: null,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.SUCCESS,
      });
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: false,
      });
      expect(dispatch).toHaveBeenNthCalledWith(5, {
        type: ActionType.CHANGE_POSTER_LOADING_STATUS,
        payload: LoadingStatus.INITIAL,
      });
      expect(dispatch).toHaveBeenNthCalledWith(6, {
        type: ActionType.CHANGE_FILM_LOADING_STATUS,
        payload: LoadingStatus.INITIAL,
      });
    });
  });
  it(`Should catch error to API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutHandler = logout();

    apiMock
      .onGet(`/logout`)
      .reply(500);

    logoutHandler(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FETCHING,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_SENDING_DATA_STATUS,
        payload: LoadingStatus.FAILURE,
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.CHANGE_AUTHORIZATION_STATUS,
        payload: true,
      });
    });
  });
});
