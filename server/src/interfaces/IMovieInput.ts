interface IMovieInput {
  title: string;
  description?: string;
  genre: string;
  poster: string;
  trailer: string;
  releaseDate: Date;
  duration: number;
  age_permission: number;
  actors?: string[];
  status: string;
}
export { IMovieInput };
