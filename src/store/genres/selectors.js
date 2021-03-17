import {NameSpace} from "../root-reducer";

export const getActiveGenre = (state) => state[NameSpace.GENRES].activeGenre;
export const getGenres = (state) => state[NameSpace.GENRES].genres;
