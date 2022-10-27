import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { requestLine, loadMore, getBooksFromLocalStorage } from './functions';
import axios from 'axios';

import './SearchPage.scss';
import Preloader from '../preloader/Preloader';
import logo from '../../assets/images/logo.png';
import BackgroundSvg from './BackgroundSvg';
import SearchForm from '../form/SearchForm';
import BooksList from '../bookslist/BooksList';


const SearchPage = () => {
   const maxResult = 30;
   const apiKey = "AIzaSyArvsaejhkJKVKaMHhXUFldx-6zBjbVOIw";

   const [searchParams, setSearchParams] = useSearchParams();
   const [result, setResult] = useState([]);
   const [totalItems, setTotalItems] = useState(0);
   const [errorMessage, setErrorMessage] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   const [requestData, setRequestData] = useState({});

   useEffect(() => {

      const getAxios = async () => {
         setIsLoading(true);

         try {
            // формирование запроса
            let request = requestLine(requestData, searchParams, maxResult, apiKey);

            // get запрос
            const response = await axios.get(request);

            if (response.data.items && response.data.totalItems) {
               setErrorMessage('');
               ~~searchParams.get('startIndex') !== 0 ? setResult([...result, ...response.data.items]) : setResult(response.data.items);
               setTotalItems(response.data.totalItems);

            } else {
               setResult([]);
               setErrorMessage(`Books not found :(`);
               setTotalItems(0);
            }

         } catch (error) {
            setErrorMessage('Sorry, cannot connect to Google Book API. Please try again!');
            setResult([]);
            setTotalItems(0);

         }

         setIsLoading(false);

      }

      const searchBookQuery = () => {
         if (localStorage.getItem('books')) {
            getBooksFromLocalStorage(scroll, setTotalItems, setResult);

         } else {
            if (requestData.title) {
               getAxios();
            }
            else {
               setErrorMessage('Please, enter book title');
               setResult([]);
               setTotalItems(0);
            }
         }
      }

      if (Object.keys(requestData).length) searchBookQuery();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [requestData, searchParams.get('startIndex')]);


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
               {isLoading && ~~searchParams.get('startIndex') === 0 ?
                  <Preloader /> : (
                     <div className="row">
                        {/* показать ошибку */}
                        {errorMessage && <h5 className='col-12 error'>{errorMessage}</h5>}

                        {/* общее кол-во найденных книг */}
                        {totalItems > 0 && <h6 className='col-12 total-book-count'>Found {totalItems} results</h6>}

                        {/* вывод карточек книг */}
                        {result.length > 0 && <BooksList books={result} totalItems={totalItems} />}
                     </div>
                  )}

               {((result.length || isLoading) && result.length < totalItems) &&
                  <div className="row justify-content-center">
                     <div className="col-6 col-md-6 col-lg-2">
                        <button onClick={() => loadMore(searchParams, setSearchParams, maxResult)} className={isLoading ? 'btn-load-more none-events' : 'btn-load-more'}>
                           {isLoading ? 'Loading...' : 'Load More'}
                        </button>
                     </div>
                  </div>
               }

               {result.length > 0 &&
                  <div className="row">
                     <button className='to-the-top-btn' onClick={() => scroll.scrollToTop()}>To the top</button>
                  </div>
               }
            </div>

         </div>
      </div >
   );
}

export default SearchPage;
