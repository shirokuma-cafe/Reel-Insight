import '../styles/MovieCard.css'
import {Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function MovieCard({title, popularity, releaseDate, posterPath, movieID}) {
  const navigate = useNavigate();
  
  const onMovieCardClick = () => {
    navigate(`/movies/${movieID}`);
  }

  return (
    <Card className='movie-card' onClick={onMovieCardClick}>
      <Card.Img variant='top' src={posterPath} alt='Placeholder image'/>
    </Card>
  )
} 

export default MovieCard;