import React from 'react';
import BookCard from '../bookcard/BookCard';

const BooksList = ({ books, totalItems }) => {

   const rememberBooks = (offsetTop) => {
      localStorage.setItem("books", JSON.stringify([...books, { totalItems: totalItems, offsetTop: offsetTop }]));
   }

   return (
      <>
         {books && books.map((book) => <BookCard key={book.etag} book={book} rememberBooks={(offsetTop) => rememberBooks(offsetTop)} />)}
      </>
   );
}

export default BooksList;
