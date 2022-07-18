import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Preloader from '../preloader/Preloader';
import noImage from '../../assets/images/no-image.jpg'

import './BookPage.scss';
import Page404 from '../page404/Page404';

const BookPage = () => {
   const { bookId } = useParams();
   const navigate = useNavigate();

   const [book, setBook] = useState(null);
   const [error, setError] = useState(false);
   const [loading, isLoading] = useState(false);

   const goBack = () => {
      navigate(-1);
   }

   useEffect(() => {
      const fetchBook = () => {
         isLoading(true);
         setBook(null);

         axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(data => {
               setBook(data.data);
            })
            .catch(error => {
               setError('Sorry, cannot connect to Google Book API. Please try again!');
               console.log(error);
            })
            .finally(() => {
               isLoading(false);
            });
      };

      fetchBook();
   }, [bookId]);


   return (
      <>
         {
            error ?
               (
                  <Page404 />
               )
               : (<div className='container'>
                  <Link className='logo-link' to={`/`}>
                     <div className="row logo-title-book-page">
                        <h1>Book<span>Search</span></h1>
                     </div>
                  </Link>

                  {loading && <Preloader />}

                  {book &&
                     (
                        <div className="row book-page">
                           <div className="col-12 col-md-12 col-lg-6">
                              <div className="book-page-img">
                                 {book.volumeInfo.imageLinks === undefined && <img src={noImage} alt={book.volumeInfo.title} />}
                                 {book.volumeInfo.imageLinks !== undefined &&
                                    <img className='thumbnail-img' src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                                 }
                              </div>
                           </div>
                           <div className="col-12 col-md-12 col-lg-6">
                              <div className="book-page-info">
                                 {book.volumeInfo.categories && <p className="category-title">{book.volumeInfo.categories.join('/')}</p>}
                                 {book.volumeInfo.title && <p className="book-title">{book.volumeInfo.title}</p>}
                                 {book.volumeInfo.authors && <p className="book-authors">{book.volumeInfo.authors.join(', ')}</p>}
                                 {book.volumeInfo.description && <p className="book-description" dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />}

                                 <div className="link-buttons">
                                    {book.volumeInfo.infoLink !== undefined && <a className='more-button' href={book.volumeInfo.infoLink}> Learn more </a>}
                                    {/* <Link className='back-to-search' to={`/`}> Go back to search </Link> */}
                                    <button className='back' onClick={goBack}> Go back to search </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
               </div>)}
      </>
   );
};

export default BookPage;