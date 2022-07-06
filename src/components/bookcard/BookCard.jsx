import React from 'react';
import './BookCard.scss';
import noImage from '../../assets/images/no-image.jpg';

import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
   return (
      <div className="col-6 col-md-4 col-lg-3" >
         <Link to={`/book/${book.id}`} className="link">
            <div className="bookcard">
               <div className="img-element">
                  <img src={book.volumeInfo.imageLinks === undefined ? noImage : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.volumeInfo.title} />
               </div>
               <p className="category-title">{book.volumeInfo.categories === undefined ? ' ' : book.volumeInfo.categories[0]}</p>
               <p className="book-title">{book.volumeInfo.title === undefined ? " " : book.volumeInfo.title}</p>
               <p className="book-authors">{book.volumeInfo.authors === undefined ? " " : book.volumeInfo.authors.join(', ')}</p>
            </div>
         </Link >
      </div>
   );
}

export default BookCard;
