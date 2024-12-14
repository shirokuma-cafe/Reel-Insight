import {Button, Col, Container, Row} from 'react-bootstrap';
import {MovieCarousel} from '../components/MovieCarousel.jsx';
import {MovieList} from '../components/MovieList.jsx';
import CustomNavbar from '../components/CustomNavbar.jsx';
import { useState } from 'react';

const TRENDING_URL = "http://localhost:3000/movies/trendingMovies";
const POPULAR_URL = "http://localhost:3000/movies/popularMovies";
const SEARCH_URL = "http://localhost:3000/movies/search";

export const Home = () => {
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(1);

  const loadNextPage = () => {
    setPage(page + 1);
  }

  // useEffect(async () => {
  //   const res = await fetch('http://localhost:3000/test-connection');
  //   console.log(res);
  // }, [])

  return (
    <>
      <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
      <Container fluid style={{backgroundColor: 'black'}}> 
        <Row>
          <Col style={{marginLeft: '5%'}}>
            <h1 style={{color: 'white', marginTop: '1%'}}>Trending Movies</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} style={{marginTop: '20px'}}>
            <MovieCarousel url={TRENDING_URL} title={'Trending Movies'}/>
          </Col>
        </Row>
        <Row>
          <Col style={{marginLeft: '5%'}}>
            <h1 style={{color: 'white', marginTop: '1%'}}>Popular Movies</h1>
          </Col>
        </Row>
        <Row>
          <MovieList url={POPULAR_URL} title={'Popular Movies'} page={page}/>
        </Row>
        <Row>
          <Col xs={12}>
            <div style ={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2%',
              justifyContent: 'center'
            }}>
              <Button onClick={loadNextPage} variant='outline-light'>Load More</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}