import {combineReducers} from "redux";
import {data} from "./data/data";
import {genres} from "./genres/genres";
import {user} from "./user/user";

export const NameSpace = {
  DATA: `DATA`,
  GENRES: `GENRES`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.GENRES]: genres,
  [NameSpace.USER]: user,
});
