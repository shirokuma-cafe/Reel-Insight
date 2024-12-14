import { Carousel, Container, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCard from "./MovieCard";

export const MovieCarousel = ({url}) => {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [errorMovies, setErrorMovies] = useState(null);
  const numberOfMoviesPerSlide = 5;

  useEffect( () => {
    const fetchTrendingMovies = async () => {
      try {
        setLoadingMovies(true);
        const res = await axios.get(url);
        if(res.status !== 200) {
          setErrorMovies(res.data.error);
        } else {
          setMovies(res.data);
        }
      } catch (e) {
        console.error('Error fetching data:', e);
        setErrorMovies(e.message);
      } finally {
        setLoadingMovies(false);
      }
    }
    fetchTrendingMovies();
  }, [])

  function splitArrayIntoChunks(array, chunkSize) {
    let tempArray = [];
    for(let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);
      tempArray.push(chunk);
    }
    return tempArray;
  }

  let movieChunks = splitArrayIntoChunks(movies, numberOfMoviesPerSlide);

  return (
    <>
      <Carousel>
        {loadingMovies ? (
          <div style={{display: 'flex', width: '100%', height: '40vh', alignItems: 'center', justifyContent: 'center'}}>
            <Spinner animation='border' variant='light'/>
          </div>
        ) : (
          movieChunks.map((chunk, chunkIndex) => (
            <Carousel.Item key={chunkIndex}>
              <Container>
                <Row justify='space-around'>
                  {chunk.map((movie) => (
                    <Col>
                      <MovieCard key={movie.movieID} title={movie.title}
                                 popularity={movie.popularity}
                                 movieID={movie.movieID}
                                 posterPath={movie.posterPath}/>
                    </Col>
                  ))}
                </Row>
              </Container>
          </Carousel.Item>
          )
        ))}
      </Carousel>
    </>
  )
}