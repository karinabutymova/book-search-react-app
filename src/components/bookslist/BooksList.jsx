import React from 'react';
import BookCard from '../bookcard/BookCard';

const BooksList = ({ books }) => {
   return (
      <>
         {books && books.map((book) => <BookCard key={book.id} book={book} />)}
      </>
   );
}

export default BooksList;
