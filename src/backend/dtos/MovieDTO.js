export class MovieDTO {
  constructor(title, popularity, releaseDate, posterPath, movieID, backdropPath, genres, overview, runtime, isBookmarked) {
    this.title = title;
    this.popularity = popularity;
    this.releaseDate = releaseDate;
    this.posterPath = `https://image.tmdb.org/t/p/original${posterPath}`;
    this.movieID = movieID;
    this.backdropPath = `https://image.tmdb.org/t/p/original${backdropPath}`;
    this.genres = genres || [];
    this.overview = overview;
    this.runtime = runtime;
    this.isBookmarked = isBookmarked;
  }
}