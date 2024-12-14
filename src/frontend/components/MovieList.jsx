import MovieCard from './MovieCard.jsx';
import { Col, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const MovieList = ({url, page}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          params: {
            page: page
          }
        });
        if(response.status !== 200) {
          setError(response.data.error);
        }
        else {
          console.log(response.data);
          const movies = response.data;
          setMovies(prevMovies => [...prevMovies, ...movies]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message)
      } finally {
        console.log('Fetch finished')
        setLoading(false);
      }
    }
    fetchPopularMovies()
  }, [page]);

  return (
    <>
      {
        loading ? (
          <div style={{
            display: 'flex',
            width:'100%',
            height: '40vh',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Spinner animation='border' variant='light'/>
          </div>
        ) : error ? (<h1>Error: ${error}</h1>) : (
          <>
            {movies.map( (movie, index) => (
              <Col key={index} sm={8} md={2} className='mb-5'>
                <MovieCard {...movie}/>
              </Col>
            ))}
          </>
        )
      }
    </>  
  )
} 