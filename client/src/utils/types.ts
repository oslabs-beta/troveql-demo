export type Query = {
  [key : string] : string
}

export type Movie = {
  id: number,
  title: string,
  genre: string,
  year: number
};

export type GetMoviesData = {
  data: {
    movies: Movie[]
  }
}

export type MovieDisplayProps = {
  movies: Movie[]
}