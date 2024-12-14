export class TrendingMovieDTO {
  constructor(title, popularity, releaseDate, posterPath, movieID) {
    this.title = title;
    this.popularity = popularity;
    this.releaseDate = releaseDate;
    this.posterPath = `https://image.tmdb.org/t/p/original${posterPath}`;
    this.movieID = movieID;
  }
}