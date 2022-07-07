import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import './SearchPage.scss';
import Preloader from '../preloader/Preloader';
import logo from '../../assets/images/logo.png';
import BackgroundSvg from './BackgroundSvg';
import SearchForm from '../form/SearchForm';
import BooksList from '../bookslist/BooksList';


const SearchPage = () => {
   const maxResult = 30;

   const [result, setResult] = useState([]);
   const [startIndex, setStartIndex] = useState(0);
   const [totalItems, setTotalItems] = useState(0);
   const [errorMessage, setErrorMessage] = useState('');

   const [isLoading, setIsLoading] = useState(false);

   const [requestData, setRequestData] = useState({});

   // для получения предыдущего значения свойства
   const usePrevious = value => {
      const ref = useRef();
      useEffect(() => {
         ref.current = value;
      });
      return ref.current;
   }

   const prevRequestData = usePrevious({ requestData });

   // проверка на сопадение данных для запроса
   const isEqualRequest = () => JSON.stringify(prevRequestData.requestData) === JSON.stringify(requestData);


   const getAxios = () => {

      setIsLoading(true);
      // setErrorMessage('');

      let { titleInput, category, sort, apiKey } = requestData;

      // формирование запроса
      let request = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleInput}`;
      category !== 'All'
         ? request += `+subject:${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`
         : request += `&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`;

      console.log(request);

      // get запрос
      axios.get(request)
         .then(data => {
            if (data.data.items && data.data.totalItems) {
               setErrorMessage('');
               isEqualRequest() ? setResult([...result, ...data.data.items]) : setResult(data.data.items);
               setTotalItems(data.data.totalItems);

            } else {
               setResult([]);
               setErrorMessage(`Books not found :(`);
               setTotalItems(0);
            }
         })
         .catch(error => {
            setErrorMessage('Sorry, cannot connect to Google Book API. Please try again!');
            setResult([]);
            setTotalItems(0);
         })
         .finally(() => {
            setIsLoading(false);
         });

   }

   useEffect(() => {
      const searchBookQuery = () => {

         let { titleInput } = requestData;

         if (!isEqualRequest()) setTotalItems(0);

         if (titleInput) getAxios();
         else {
            setErrorMessage('Please, enter book title');
            setResult([]);
         }
      }

      if (Object.keys(requestData).length) searchBookQuery();

   }, [requestData, startIndex]);

   const loadMore = () => {
      // если запросы разные, то обнуляем стартовый индекс поиска книг
      isEqualRequest() ? setStartIndex(startIndex + maxResult) : setStartIndex(0);
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
            setRequestData={setRequestData}
            setStartIndex={setStartIndex} />

         <div className="bookcards-list">
            <div className="container">
               {/* загрузка результатов */}
               {isLoading && totalItems === 0 ?
                  <Preloader /> : (
                     <div className="row">
                        {/* показать ошибку */}
                        {errorMessage && <h5 className='col-12 error'>{errorMessage}</h5>}

                        {/* общее кол-во найденных книг */}
                        {totalItems > 0 && <h6 className='col-12 total-book-count'>Found {totalItems} results</h6>}

                        {/* вывод карточек книг */}
                        <BooksList books={result} />
                     </div>
                  )}

               {(result.length !== 0 || isLoading) &&
                  <div className="row justify-content-center">
                     <div className="col-6 col-md-6 col-lg-2">
                        <button onClick={loadMore} className={isLoading ? 'btn-load-more none-events' : 'btn-load-more'}>
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
