import React, { useState } from 'react';
import './App.css';
import logo from './images/logo.png';
import BackgroundSvg from './components/BackgroundSvg';
import SearchForm from './components/form/SearchForm';

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

         <SearchForm result={setResult} />

         {result.map(book => (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
         ))}

      </div>
   );
}

export default App;
