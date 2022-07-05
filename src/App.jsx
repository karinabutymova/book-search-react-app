import React from 'react';
import './App.scss';
import SearchPage from './components/searchpage/SearchPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookPage from './components/bookpage/BookPage';


const App = () => {

   return (
      <>
         <Router>
            <Routes>
               <Route exact path="/" element={<SearchPage />} />
               <Route path="/book/:bookId" element={<BookPage />} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
