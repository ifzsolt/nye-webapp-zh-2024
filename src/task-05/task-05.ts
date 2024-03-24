import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const movies: Movie[] = await MovieService.getMovies();
    const filteredMovies: Movie[] = listazasMovies(movies, params.query ?? '', params.genre ?? []);
    const sortedMovies: Movie[] = rendezesMovies(filteredMovies, params.orderBy ?? 'title', params.direction ?? 'ASC');
    const total: number = sortedMovies.length;
    const slicedMovies: Movie[] = levagasMovies(sortedMovies, params.offset ?? 0, params.limit ?? 12);
    return { total, movies: slicedMovies };
  } catch (error) {
    return { total: 0, movies: [] };
  }
};
const listazasMovies = (movies: Movie[], query: string, genre: Genre[]): Movie[] => {
  return movies.filter(movie =>
      (query === '' || movie.title.toLowerCase().includes(query.toLowerCase()) || movie.overview.toLowerCase().includes(query.toLowerCase())) &&
      (genre.length === 0 || movie.genres !== undefined && movie.genres.some(zsaner => genre.includes(zsaner)))
  );
};
const rendezesMovies = (movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] => {
  switch(direction){
    case 'DESC':
      switch (orderBy) {
        case 'release_date':
          return movies.sort((x, y) => {
            const X: any = new Date(x.release_date).getTime();
            const Y: any = new Date(y.release_date).getTime();
            return Y - X;
          });
        case 'vote_average':
          return movies.sort((x, y) => {
            const X: any = x.vote_average;
            const Y: any = y.vote_average;
            return Y - X;
          });
        default:
          return movies.sort((x, y) => {
            const X: any = x.title;
            const Y: any = y.title;
            return Y.localeCompare(X);
          });
      }
    default:
      switch (orderBy) {
        case 'release_date':
          return movies.sort((x, y) => {
            const X: any = new Date(x.release_date).getTime();
            const Y: any = new Date(y.release_date).getTime();
            return X - Y;
          });
        case 'vote_average':
          return movies.sort((x, y) => {
            const X: any = x.vote_average;
            const Y: any = y.vote_average;
            return X - Y;
          });
        default:
          return movies.sort((x, y) => {
            const X: any = x.title;
            const Y: any = y.title;
            return X.localeCompare(Y);
          });
      }
  }
};
const levagasMovies = (movies: Movie[], offset: number, limit: number): Movie[] => {
  return movies.slice(offset, offset + limit);
};