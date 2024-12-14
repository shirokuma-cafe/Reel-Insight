import express from 'express';
import { getMovieByID, getMoviesBySearch, getPopularMovies, getTrendingMovies, bookmarkMovie, unBookmarkMovie } from '../models/MovieModal.js';

const router = express.Router();

// /movies/trendingMovies
router.get('/trendingMovies', async (req, res) => {
  try {
    console.log('Getting Trending Movies...')
    const movies = await getTrendingMovies();
    res.send(movies);
  }
  catch (e) {
    console.error(e.message)
    res.status(400).send('Internal Server Error');
  }
})

// /movies/popularMovies
router.get('/popularMovies', async (req, res) => {
  try {
    console.log('Getting Popular Movies...')
    const page = req.query.page || 1;
    const movies = await getPopularMovies(page);
    res.send(movies);
  }
  catch (e) {
    console.error(e.message);
    res.status(400).send('Internal Server Error');
  }
})

// /movies/search
router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.query;
    console.log(searchQuery);
    const movies = await getMoviesBySearch(searchQuery);
    res.send(movies);
  } catch (e) {
    console.error(e.message);
    res.status(400).send('Internal Server Error');
  }
})

// /movies/movieDetail
router.get('/movieDetail', async (req, res) => {
  try {
    const movieID = req.query.movieID;
    console.log(movieID);
    const movie = await getMovieByID(movieID);
    res.send(movie);
  } catch (e) {
    console.error(e.message);
    res.status(400).send('Internal Server Error');
  }
})

// /movies/bookmarkMovie
router.post('/bookmarkMovie', async (req, res) => {
  try {
    console.log('Received body:', req.body);
    const { movieID, movieName, releaseDate } = req.body;
    const dbResponse = await bookmarkMovie(movieID, movieName, releaseDate);
    res.send(dbResponse);
  } catch (e) {
    res.status(400).send('Internal Server Error');
  }
})

router.delete('/unBookmarkMovie', async (req, res) => {
  try {
    console.log('Received body:', req.body);
    const { movieID, movieName, releaseDate } = req.body;
    const dbResponse = await unBookmarkMovie(movieID, movieName, releaseDate);
    res.send(dbResponse);
  } catch (e) {
    res.status(400).send('Internal Server Error');
  }
})

router.get('/bookmarkMovie', async (req, res) => {
  try {
    const movieID = req.query.movieID;
  } catch (e) {
    console.error(e.message);
  }
})

export default router