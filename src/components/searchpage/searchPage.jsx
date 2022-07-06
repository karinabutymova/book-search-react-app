import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './SearchPage.scss';
import logo from '../../assets/images/logo.png';
import BackgroundSvg from './BackgroundSvg';
import SearchForm from '../form/SearchForm';
import Preloader from '../preloader/Preloader';
import BooksList from '../bookslist/BooksList';


const SearchPage = () => {
   const maxResult = 30;

   const [result, setResult] = useState([]);
   const [startIndex, setStartIndex] = useState(0);
   const [totalItems, setTotalItems] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   const [requestData, setRequestData] = useState({});


   useEffect(() => {
      const searchBookQuery = async () => {

         try {
            setIsLoading(true);
            setErrorMessage('');

            let { titleInput, category, sort, apiKey } = requestData;

            let request = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleInput}`;
            category !== 'All'
               ? request += `+subject:${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`
               : request += `&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`;
            // get запрос
            const response = await axios.get(request);

            if (response.data.items && response.data.totalItems) {
               setErrorMessage('');
               setResult([...result, ...response.data.items]);
               setTotalItems(response.data.totalItems);
            } else {
               setResult([]);
               setErrorMessage(`Books not found :(`);
               setTotalItems('');
            }
         }
         catch (error) {
            setErrorMessage('Sorry, cannot connect to Google Book API. Please try again!');
            setResult([]);
         }
         finally {
            setIsLoading(false);
         }

      }
      if (Object.keys(requestData).length) searchBookQuery();

   }, [requestData, startIndex]);

   const loadMore = () => {
      setStartIndex(startIndex + maxResult);
   };


   return (
      <div className="app">
         <BackgroundSvg />
         <div className="container">
            <div className="row justify-content-center">
               <div className='col-4 logo-title'>
                  <img src={logo} alt="" />
                  <h1>Book<span>Search</span></h1>
               </div>
            </div>
         </div>

         {/* форма поиска*/}
         <SearchForm
            result={setResult}
            totalItems={setTotalItems}
            errorMsg={setErrorMessage}
            isLoading={setIsLoading}
            setRequestData={setRequestData} />

         <div className="bookcards-list">
            <div className="container">
               {/* загрузка результатов */}
               {/* {isLoading ?
                  <Preloader /> : ( */}
               <div className="row">
                  {/* показать ошибку */}
                  {errorMessage && <h5 className='col-12 error'>{errorMessage}</h5>}

                  {/* общее кол-во найденных книг */}
                  {totalItems > 0 && <h6 className='col-12 total-book-count'>Found {totalItems} results</h6>}

                  {/* вывод карточек книг */}
                  <BooksList books={result} />
               </div>
               {/* )} */}

               {(result.length !== 0 || isLoading) &&
                  <div className="row justify-content-center">
                     <div className="col-6 col-md-6 col-lg-2">
                        <button onClick={loadMore} className="btn-load-more">
                           {isLoading ? 'Loading...' : 'Load More'}
                        </button>
                     </div>
                  </div>
               }
            </div>

         </div>
      </div >
   );
}

export default SearchPage;
