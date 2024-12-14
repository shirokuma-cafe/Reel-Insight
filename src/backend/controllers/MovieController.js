// controllers should just handle talking to api endpoints
import axios from 'axios';
import db from '../db.js'
import * as process from 'node:process';

export const getTrendingMoviesController = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
      params: {
        api_key: process.env.TMDB_API_KEY, 
      },
    })
    const data = response.data;
    return data.results;
  } catch (e) {
    console.error('Error fethcing trending movies:', e);
    throw e
  }
}

export const getPopularMoviesController = async (page) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
      params: {
        api_key: process.env.TMDB_API_KEY, 
      },
    })
    const data = response.data;
    return data.results;
  } catch (e) {
    console.error('Error fethcing popular movies:', e);
    throw e
  }
}

export const getMoviesBySearchController = async (searchQuery) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`, {
      params: {
        api_key: process.env.TMDB_API_KEY, 
      },
    })
    const data = response.data;
    return data.results;
  } catch (e) {
    console.error('Error fetching movie: ', e);
    throw e;
  }
}

export const getMovieByIDController = async (movieID) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
      params: {
        api_key: process.env.TMDB_API_KEY, 
      },
    })
    return response.data
  } catch (e) {
    console.error('Error fetching movie: ', e);
    throw e;
  }
}

export const bookmarkMovieController = async (movieID, movieName, releaseDate) => {
  try {
    const result = await db.query('INSERT INTO favoriteMovies (id, name, releaseDate) VALUES (?, ?, ?)', 
      [movieID, movieName, releaseDate]);
    return result;
  } catch(e) {
    console.error('Could not insert bookmark: ', e)
  }
}

export const unBookmarkMovieController = async (movieID, movieName, releaseDate) => {
  try {
    const result = await db.query('DELETE FROM favoriteMovies WHERE id = ? AND name = ? AND releaseDate = ?', 
      [movieID, movieName, releaseDate]);
    return result;
  } catch(e) {
    console.error('Could not delete bookmark: ', e)
  }
}