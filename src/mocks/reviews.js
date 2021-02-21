import nanoid from "nanoid";
import {films} from "./films";
import {users} from "./users";

export const reviews = [
  {
    id: nanoid(),
    autorId: users[0].id,
    filmId: films[0].id,
    text: `Fantastic!`,
    rating: 9,
    date: new Date().toISOString(),
  },
  {
    id: nanoid(),
    autorId: users[0].id,
    filmId: films[1].id,
    text: `Awesome!`,
    rating: 10,
    date: new Date().toISOString(),
  },
  {
    id: nanoid(),
    autorId: users[1].id,
    filmId: films[0].id,
    text: `Awful`,
    rating: 2,
    date: new Date().toISOString(),
  },
];
