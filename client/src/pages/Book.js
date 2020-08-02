import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Detail } from "../components/Detail";


function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

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

  function saveBook(id) {
    API.saveBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }


  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    // if (formObject.title && formObject.author) {
      API.searchBooks() 
      // API.searchBooks({
      //   title: formObject.title,
      //   author: formObject.author,
      //   synopsis: formObject.synopsis
      // })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    // }
  };


  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>What to read..🤔</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            {/* <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
            <FormBtn
              disabled={!(formObject.title)}
              onClick={handleFormSubmit}
            >
              Search Book
              </FormBtn>
            <hr></hr>
            <br></br>
          </form>
          <hr></hr>
          <br></br>
          {books.length ? (

            <List>

              {books.map(book => (
                <ListItem key={book._id}>
                  
                  <Link to={"/books/" + book._id}>
                    <Detail>
                      <h5> {book.title} </h5>
                      <h6> {book.author} </h6>
                      <p> {book.synopsis} This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      {/* <strong>
                        {book.title} by {book.author}
                      </strong> */}
                    </Detail>
                    <SaveBtn onClick={() => saveBook(book._id)} />
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </Link>
                  
                 
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}

        </Col>
        {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => saveBook(book._id)} />
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}
      </Row>
    </Container>
  );
}


export default Books;
