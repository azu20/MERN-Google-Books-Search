import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import { DetailBody, DetailImage } from "../components/Detail/";


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
  // function deleteBook(id) {
  //   API.deleteBook(id)
  //     .then(res => loadBooks())
  //     .catch(err => console.log(err));
  // }

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
        for (let book of res.data.items) {
          let volInfo = book.volumeInfo;
          console.log(volInfo);
          books.push(
            {
              title: volInfo.title,
              author: volInfo.hasOwnProperty("authors") ? volInfo.authors.join(", ") : "unknown",
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
      <Jumbotron>
        <h1 style={{ fontSize: "72px" }} >What to read..<span role="img" aria-label="thinking-emoji">🤔</span>
        </h1>
      </Jumbotron>
      <div>
        <form className="text-center">
          <Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title (required)"
            style={{ fontSize: "28px", fontWeight: "bold" }}
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
      </div>
      <hr></hr>
      <br></br>
      {books.length ? (
        <List>
          {
            books.map(book => (

              <ListItem key={book._id}>
                <div className="card mb-6" >
                  <div className="row no-gutters">
                    <div className="col-md-6 text-center" style={{ margin: "auto" }}>
                      <DetailBody>
                      <h1> {book.title} </h1>
                      <br></br>
                        <h2>By: {book.author} </h2>
                        <br></br>
                        <Link to={"/books/" + book._id}>
                        <h2>Click for Book Details</h2>
                        </Link>
                      </DetailBody>
                        <br></br>
                        <SaveBtn onClick={() => saveBook(book)} />
                    </div>
                    <div className="col-md-6 text-center" style={{ margin: "auto", padding: "1.5rem"}}>
                      <DetailImage>
                        {book.image}
                      </DetailImage>
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
        
    </Container>
  );
}


export default Books;
