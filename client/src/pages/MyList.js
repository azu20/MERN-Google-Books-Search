import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
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
          <Jumbotron style={{ textAlign: "center" }}>
            <h1>My Reading List</h1>
          </Jumbotron>
          <hr></hr>
          <br></br>
          {books.length ? (

            <List>
              {
                books.map(book => (
                  <ListItem key={book._id} style={{ backgroundColor: "#E2B091" }}>
                    <div className="card mb-3" style={{ backgroundColor: "#E2B091" }}>
                      <div className="row no-gutters" style={{ backgroundColor: "#E2B091" }}>
                        <div className="col-md-4">
                          <DetailImage>
                            {book.image}
                          </DetailImage>
                        </div>
                        <div className="col-md-8">
                          <DetailBody>
                            <h1> {book.title} </h1>
                            <br></br>
                            <h2> By: {book.author} </h2>
                            <br></br>
                            {/* <p> {book.synopsis} </p> */}
                          </DetailBody>
                          <Link to={"/books/" + book._id}>
                          <h2 className="moreDeatils text-center">Click for more Book Details</h2>
                        </Link>
                        <br></br>
                        <DeleteBtn onClick={() => deleteBook(book._id)} 
                        style={{ backgroundColor: "#32485C", color: "white", fontWeight: "bold", fontSize: "28px", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"  }} 
                       />
                        </div>
                      </div>
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
