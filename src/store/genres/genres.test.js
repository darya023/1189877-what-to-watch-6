import {INITIAL_GENRE} from "../../const";
import {changeGenre, resetGenre, setGenres} from "../action-creator";
import {genres} from "./genres";

const initialState = {
  activeGenre: INITIAL_GENRE,
  genres: []
};

describe(`Genres reducers work correctly`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(genres(undefined, {})).toEqual(initialState);
  });
  it(`Reducer should change active genre`, () => {
    const genre = `test`;

    const expectedState = {
      activeGenre: genre,
      genres: []
    };

    expect(genres(initialState, changeGenre(genre))).toEqual(expectedState);

    const initialStateForTestGenre = {
      activeGenre: genre,
      genres: []
    };

    const expectedStateForSameTestGenre = {
      activeGenre: genre,
      genres: []
    };

    expect(genres(initialStateForTestGenre, changeGenre(genre))).toEqual(expectedStateForSameTestGenre);
  });
  it(`Reducer should set genres`, () => {
    const films = [
      {
        id: `1`,
        title: `The Grand Budapest Hotel`,
        image: ``,
        poster: ``,
        backgroundImage: ``,
        genre: `Drama`,
        year: 2014,
        video: ``,
        promoVideo: ``,
        description: `Non non sunt Lorem quis sit voluptate commodo aliqua ut.`,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
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
        genre: `Fantasy`,
        year: 2018,
        video: ``,
        promoVideo: ``,
        description: `Laboris excepteur et nostrud commodo laboris anim pariatur pariatur ipsum.`,
        director: `Wes Andreson`,
        actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
        starring: [`Bill Murray`, `Edward Norton`],
        duration: 120,
        rating: 7.5,
        reviewsCount: 3,
        isFavorite: true,
      }
    ];

    const expectedState = {
      activeGenre: INITIAL_GENRE,
      genres: [INITIAL_GENRE, `Drama`, `Fantasy`]
    };

    expect(genres(initialState, setGenres(films))).toEqual(expectedState);
  });
  it(`Reducer should reset active genre`, () => {
    const expectedState = {
      activeGenre: INITIAL_GENRE,
      genres: []
    };

    expect(genres(initialState, resetGenre())).toEqual(expectedState);

    const genre = `test`;
    const initialStateForTestGenre = {
      activeGenre: genre,
      genres: []
    };

    expect(genres(initialStateForTestGenre, resetGenre())).toEqual(expectedState);
  });

});
