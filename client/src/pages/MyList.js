import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import { DetailBody, DetailImage } from "../components/Detail/";


function MyList() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  // const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }



  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>My Reading List</h1>
          </Jumbotron>
          <hr></hr>
          <br></br>
          {books.length ? (

            <List>
              {
                books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <div className="card mb-3" >
                        <div className="row no-gutters">
                          <div className="col-md-4">
                            <DetailImage>
                              {book.image}
                            </DetailImage>
                          </div>
                          <div className="col-md-8">
                            <DetailBody>
                              <h5> {book.title} </h5>
                              <h6> {book.author} </h6>
                              <p> {book.synopsis} </p>
                            </DetailBody>
                          </div>
                        </div>
                      </div>
                    
                    </Link>
                    <div>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                    </div>
                  </ListItem>
                )
                )
              }
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}

        </Col>

      </Row>
    </Container>
  );
}


export default MyList;
