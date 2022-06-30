import React, { useState } from 'react';
import './App.css';
import logo from './images/logo.png';
import BackgroundSvg from './components/BackgroundSvg';
import SearchForm from './components/form/SearchForm';
import BookCard from './components/bookcard/BookCard';

function App() {

   const [result, setResult] = useState([]);

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
         <SearchForm result={setResult} />

         <div className="bookcards-list">
            <div className="container">
               <div className="row">

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
            </div>
         </div>
      </div>
   );
}

export default App;
