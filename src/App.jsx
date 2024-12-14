import './frontend/App.css';
import './frontend/styles/SortButton.css';
import { MovieDetailPage } from './frontend/pages/MovieDetailPage.jsx';
import { Home } from './frontend/pages/Home.jsx';
import {Routes, Route} from 'react-router-dom';
import SearchPage from './frontend/pages/SearchPage.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies/:id' element={<MovieDetailPage/>}/>
      <Route path='/movies/search' element={<SearchPage/>}/>
    </Routes>
  )
}

export default App
