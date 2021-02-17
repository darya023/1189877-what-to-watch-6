import nanoid from "nanoid";

export const reviews = [
  {
    id: nanoid(),
    autorId: nanoid(),
    filmId: nanoid(),
    text: `Fantastic!`,
    rating: 9,
    date: new Date().toISOString(),
  },
  {
    id: nanoid(),
    autorId: nanoid(),
    filmId: nanoid(),
    text: `Awesome!`,
    rating: 10,
    date: new Date().toISOString(),
  },
  {
    id: nanoid(),
    autorId: nanoid(),
    filmId: nanoid(),
    text: `Awful`,
    rating: 2,
    date: new Date().toISOString(),
  },
];
