import {Col, Container, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import SortButton from "../components/SortButton.jsx";
import axios from 'axios';
import '../styles/SortButton.css';

export const SearchPage = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([])

  const [filterType, setFilterType] = useState('ascending')

  const handleSetFilterType = (filterType) => {
    setFilterType(filterType)
  }

  const SEARCH_URL = "http://localhost:3000/movies/search";

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q'); 

  useEffect( () => {
    const fetchSearchedMovies = async () => {  
      try {
        setLoading(true);
        const response = await axios.get(SEARCH_URL, {
          params: {
            query: query,
          }
        });
        if(response.status !== 200) {
          setError(response.data.error);
        }
        else {
          console.log(response.data);
          setSearchResults(response.data);
        }
      } catch (err) {
        console.log('Error with search');
        setError(err);
      } finally {
        console.log('Fetch finished')
        setLoading(false);
      }
    }
    fetchSearchedMovies()
  }, [query]);

  const sortedMovies = [...searchResults].sort((a, b) => {
    if (filterType === 'ascending') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title); 
    }
  })

  return (
    <>
      <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
      <Container fluid style={{backgroundColor: 'black'}}>
        {searchResults.length > 0 ? (
          <>
            <Row>
              <Col>
                <h1 style={{color: 'white'}}>Search Results for: {query}</h1>
              </Col>
              <Col className="text-end mt-2">
                <SortButton filterType={filterType} setFilterType={handleSetFilterType} className="sort-button"/>
              </Col>
            </Row>
            <Row>
              {sortedMovies.map((movie, index) => (
                <Col key={index} sm={8} md={2} className='mb-5'>
                  <MovieCard {...movie}/>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <div className="d-flex align-items-start" style={{backgroundColor: 'black', height: '100vh'}}>
              <h1 style={{color: 'white'}}>No Results</h1>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default SearchPage;
