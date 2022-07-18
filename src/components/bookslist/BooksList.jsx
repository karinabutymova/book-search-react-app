import React from 'react';
import uniqid from 'uniqid';
import BookCard from '../bookcard/BookCard';

const BooksList = ({ books, totalItems }) => {

   const rememberBooks = (offsetTop) => {
      localStorage.setItem("books", JSON.stringify([...books, { totalItems: totalItems, offsetTop: offsetTop }]));
   }

   return (
      <>
         {books && books.map((book) => <BookCard key={uniqid()} book={book} rememberBooks={(offsetTop) => rememberBooks(offsetTop)} />)}
      </>
   );
}

export default BooksList;
