import React from 'react';
import BookCard from '../bookcard/BookCard';

const BooksList = ({ books, totalItems }) => {
   const rememberBooks = () => {
      localStorage.setItem("books", JSON.stringify([...books, { totalItems: totalItems }]));
   }

   return (
      <>
         {books && books.map((book) => <BookCard key={book.id} book={book} rememberBooks={() => rememberBooks()} />)}
      </>
   );
}

export default BooksList;
