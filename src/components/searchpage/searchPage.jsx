import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import BackgroundSvg from '../BackgroundSvg';
import SearchForm from '../form/SearchForm';
import BookCard from '../bookcard/BookCard';


const SearchPage = () => {
   const [result, setResult] = useState([]);
   const [totalItems, setTotalItems] = useState([]);
   const [errorMessage, setErrorMessage] = useState('');

   const [isLoading, setIsLoading] = useState(false);

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
            isLoading={setIsLoading} />

         <div className="bookcards-list">
            <div className="container">
               {/* загрузка результатов */}
               {isLoading ?
                  (
                     <div className="row justify-content-center">
                        <div className="col-6">
                           <div className="box">
                              <div className="container-box">
                                 <span className="circle"></span>
                                 <span className="circle"></span>
                                 <span className="circle"></span>
                                 <span className="circle"></span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="row">
                        {/* показать ошибку */}
                        {errorMessage && <h5 className='col-12 error'>{errorMessage}</h5>}

                        {/* общее кол-во найденных книг */}
                        {totalItems > 0 && <h6 className='col-12 total-book-count'>Found {totalItems} results</h6>}

                        {/* вывод карточек книг */}
                        {result.length > 0 &&
                           result.map(book => (
                              <div className="col-6 col-md-4 col-lg-3" key={book.id}>
                                 <BookCard
                                    book={book} />
                              </div>
                           ))
                        }
                     </div>
                  )}

            </div>

         </div>
      </div>
   );
}

export default SearchPage;
