import React, { useState } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
// import { DetailRow, DetailBody, DetailImage } from "../components/Detail/index.js";
// import { Input, TextArea, FormBtn } from "../components/Form";

function MyList() {
        // Setting our component's initial state
        const [books, setBooks] = useState([])
        // const [formObject] = useState({})
      
        // // Load all books and store them with setBooks
        // useEffect(() => {
        //   loadBooks()
        // }, [])
      
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
<Container>
    <Row>
 <Col size="md-6 sm-12">
 <Jumbotron>
   <h1>Books On My List</h1>
 </Jumbotron>
 {books.length ? (
  <List>
  {books.map(book => (
     <ListItem key={book._id}>
                  
     <Link to={"/books/" + book._id}>
        {/* <DetailRow> 
         <DetailImage>
         </DetailImage>
         <DetailBody>
         <h5> {book.title} </h5>
         <h6> {book.author} </h6>
         <p> {book.synopsis} </p>
         </DetailBody>
        </DetailRow>  */}
       <DeleteBtn onClick={() => deleteBook(book._id)} />
     </Link>
     
    
   </ListItem>
  ))}
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