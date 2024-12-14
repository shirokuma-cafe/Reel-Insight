import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";
import { useNavigate } from 'react-router-dom'

const CustomNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchQuery.trim() !== '') {
      navigate(`/movies/search?q=${searchQuery}`);
    }
  }

  const handleHomeClick = () => {
    setSearchQuery('')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand onClick={handleHomeClick} href="/">
          <img
            src='/movie.png'
            width={30}
            height={30}
            className="d-inline-block align-top mx-2"
            alt="Reel Insight Logo"
          />
          Reel Insight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar;