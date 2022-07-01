import React from 'react';
import './BookCard.css';
import noImage from '../../assets/images/no-image.jpg';

const BookCard = ({ book }) => {
   return (
      <div className="bookcard">
         <div className="img-element">
            <img src={book.volumeInfo.imageLinks === undefined ? noImage : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.volumeInfo.title} />
         </div>
         <p className="category-title">{book.volumeInfo.categories === undefined ? " " : book.volumeInfo.categories[0]}</p>
         <p className="book-title">{book.volumeInfo.title === undefined ? " " : book.volumeInfo.title}</p>
         <p className="book-authors">{book.volumeInfo.authors === undefined ? " " : book.volumeInfo.authors.join(', ')}</p>
      </div>

   );
}

export default BookCard;
