import {Col, Container, Row} from "react-bootstrap";
import {MovieList} from "../components/MovieList.jsx";
import {useState} from "react";
import CustomNavbar from "../components/CustomNavbar.jsx";
import MovieCard from "../components/MovieCard.jsx";
import SortButton from "../components/SortButton.jsx";
import '../styles/SortButton.css'

const TRENDING_URL = "http://localhost:3000/movies/trendingMovies";
const POPULAR_URL = "http://localhost:3000/movies/popularMovies";
const SEARCH_URL = "http://localhost:3000/movies/search";


function TrendingMovies() {
  const [searchResults, setSearchResults] = useState([])
  const [filterType, setFilterType] = useState('ascending')

  const handleSetFilterType = (filterType) => {
    setFilterType(filterType)
  }

  return (
    <>
      <CustomNavbar setSearchResults={setSearchResults} url={SEARCH_URL}/>
      <Container fluid>
        {searchResults.length > 0 ? (
          <>
            <h1>Search Results</h1>
            <Row>
              {searchResults.map((movie, index) => (
                <Col key={index} sm={8} md={2} className='mb-5'>
                  <MovieCard {...movie}/>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <div className="header-container">
              <h1>Trending Movies</h1>
              <SortButton filterType={filterType} setFilterType={handleSetFilterType} className="sort-button"/>
            </div>
            <Row>
            <MovieList url={TRENDING_URL} filterType={filterType}/>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default TrendingMovies;
