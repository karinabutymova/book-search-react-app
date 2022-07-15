import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll'

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
            let { title, category, sort } = requestData;
            let startIndex = ~~searchParams.get('startIndex');

            // формирование запроса
            let request = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
            category !== 'All'
               ? request += `+subject:${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`
               : request += `&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`;

            // get запрос
            const response = await axios.get(request);

            if (response.data.items && response.data.totalItems) {
               setErrorMessage('');
               startIndex !== 0 ? setResult([...result, ...response.data.items]) : setResult(response.data.items);
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

         } finally {
            setIsLoading(false);
         }

      }

      const searchBookQuery = () => {
         let { title } = requestData;

         if (localStorage.getItem('books')) {

            let books = JSON.parse(localStorage.getItem("books"));
            localStorage.removeItem('books');

            setTotalItems(books.pop().totalItems);
            setResult(books);
         } else {
            if (title) getAxios();
            else {
               setErrorMessage('Please, enter book title');
               setResult([]);
            }
         }
      }

      if (Object.keys(requestData).length) searchBookQuery();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [requestData, searchParams.get('startIndex')]);

   const loadMore = () => {
      searchParams.set('startIndex', ~~searchParams.get('startIndex') + maxResult);
      setSearchParams(searchParams);
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
               {isLoading && ~~searchParams.get('startIndex') === 0 ?
                  <Preloader /> : (
                     <div className="row">
                        {/* показать ошибку */}
                        {errorMessage && <h5 className='col-12 error'>{errorMessage}</h5>}

                        {/* общее кол-во найденных книг */}
                        {totalItems > 0 && <h6 className='col-12 total-book-count'>Found {totalItems} results</h6>}

                        {/* вывод карточек книг */}
                        <BooksList books={result} totalItems={totalItems} />
                     </div>
                  )}

               {((result.length || isLoading) && result.length < totalItems) &&
                  <div className="row justify-content-center">
                     <div className="col-6 col-md-6 col-lg-2">
                        <button onClick={loadMore} className={isLoading ? 'btn-load-more none-events' : 'btn-load-more'}>
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
