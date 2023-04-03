import logo from "./logo.svg";
import "./App.css";
import MovieCard from "./MoviesCard/MovieCard";
import Draggable from 'react-draggable';
import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setstatus] = useState(0);
  const [movies, setMovies] = useState([]);

   const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = 'c2062f5b';
      const apiUrl = `http://www.omdbapi.com/?s=${searchQuery}&apikey=c2062f5b`;
   
    try {
      const response = await axios.get(apiUrl);
      setMovies(response.data.Search);
     
      if( response.data.Search.length===0){
         setstatus(0) 
      }
    if(searchQuery.length===0){ 
        setstatus(0)
       }

      else{
        setstatus(1)
        console.log(movies)
      }
    } catch (error) {
      setstatus(0)
      console.log(error);
    }
   };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Form onSubmit={handleSearch}>
            <Form.Group className="d-flex" style={{
              backgroundColor: 'rgb(73, 214, 160)',
              padding:'20px'
            }}>
            
               <input className="form-control me-2" type="text" placeholder="Enter Movie title" aria-label="Search"   value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}></input>
              <Button variant="outline-success" type="submit" style={{
                backgroundColor:'white'
              }}>
                Search
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
       {status===0&& <div style={{
      
      width:'100%',
      marginTop:"3rem",
    textAlign:"center",
      

       }}>No Movies Found</div>}
       {status===1&& 
        <MovieCard movies={movies}/>
       }
         
        </Col>
      </Row>
    </Container>
  );
};



export default App;
