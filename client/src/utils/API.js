import axios from "axios";
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";

export default {
  searchBooks: async function (term) {
    let response =
      await axios.get(BASEURL + term)
        .then(x => x)
        .catch(err => console.log("error: ", err));
    console.log("API.search() called", response);
    return response;
  },
  // Gets all books
  getBooks: async function () {
    let response = axios.get("/api/books")
    .catch(err => console.log("error: ", err));
    return response;
  },
  // Gets the book with the given id
  getBook: async function (id) {
    let response = axios.get("/api/books/" + id)
    .catch(err => console.log("error: ", err));
    return response;
  },
  // Deletes the book with the given id
  deleteBook: async function (id) {
    let response = axios.delete("/api/books/" + id)
    .then(x => console.log("the response from deleting the book is", x))
    .catch(err => console.log("error: ", err));
    return response;
  },
  // Saves a book to the database
  saveBook: async function (bookData) {
    //
    let response = 
    axios.post("/api/books", bookData)
    .then(x => console.log("the response from psoting the book is", x))
    .catch(error =>  
      {
         if (error.response) {
            console.log(error.response);
      }
    }
    );
    return response;
  }
};
