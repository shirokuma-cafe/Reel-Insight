import db from '../db.js';
import { MovieDTO } from  '../dtos/MovieDTO.js';
import { TrendingMovieDTO } from '../dtos/TrendingMovieDTO.js';
import { getTrendingMoviesController, getPopularMoviesController, getMoviesBySearchController, getMovieByIDController, bookmarkMovieController, unBookmarkMovieController } from '../controllers/MovieController.js'; 

export const generateDTOs = (data, dataType='trending') => {
  const cleanedMovies = [];
  data.map(movie => {
    let cleanedMovie = new TrendingMovieDTO(movie.title, movie.popularity, movie.release_date, movie.poster_path, movie.id);
    cleanedMovies.push(cleanedMovie);
  })
  return cleanedMovies
}

export const generateMovieDetails = (movie) => {
  const {backdrop_path, release_date, genres, poster_path, title, id, runtime, overview, popularity, isBookmarked} = movie
  return new MovieDTO(title, popularity, release_date, poster_path, id, backdrop_path, genres, overview, runtime, isBookmarked)
}

export const getTrendingMovies = async () => {
  const movies = await getTrendingMoviesController();
  return generateDTOs(movies)
}

export const getPopularMovies = async (page) => {
  const movies = await getPopularMoviesController(page);
  return generateDTOs(movies);
}

export const getMoviesBySearch = async (searchQuery) => {
  const movies = await getMoviesBySearchController(searchQuery);
  return generateDTOs(movies);
}

export const getMovieByID = async (movieID) => {
  const movie = await getMovieByIDController(movieID);
  let bookmarked = await getMovieByIDFromDB(movieID);
  movie.isBookmarked = bookmarked.length > 0;
  return generateMovieDetails(movie);
}

export const bookmarkMovie = async (movieID, movieName, releaseDate) => {
  return await bookmarkMovieController(movieID, movieName, releaseDate);
}

export const unBookmarkMovie = async (movieID, movieName, releaseDate) => {
  return await unBookmarkMovieController(movieID, movieName, releaseDate);
}

const getMovieByIDFromDB = async (movieID) => {
  const [rows] = await db.query('SELECT id FROM favoriteMovies WHERE id = ?', [movieID]);
  return rows;
}