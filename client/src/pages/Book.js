import React, { useState, useEffect } from "react";
// import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import { DetailBody, DetailImage } from "../components/Detail/";
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

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

  function saveBook(book) {
    API.saveBook(book)
      .then(res => loadBooks()
      // navigation.navigate('MyList')
      )
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
    API.searchBooks(formObject.title)
      .then(res => {
       
        let books = [{}];  
        for(let book of res.data.items){
            let volInfo = book.volumeInfo;
            console.log(volInfo);
            books.push(
              {
                title: volInfo.title,
                author:  volInfo.hasOwnProperty("authors") ? volInfo.authors.join(", ") :  "unknown",
                synopsis: volInfo.description,
                image: volInfo.hasOwnProperty("imageLinks") ? volInfo.imageLinks.smallThumbnail : ""
              });
        };

        setBooks(books);
      
      }
         )
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
                    <SaveBtn onClick={() => saveBook(book)} />
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


export default Books;
