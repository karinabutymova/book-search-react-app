import React from 'react';
import SearchPage from './components/searchpage/SearchPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookPage from './components/bookpage/BookPage';
import Page404 from './components/page404/Page404';


const App = () => {

   return (
      <>
         <Router>
            <Routes>
               <Route exact path="/" element={<SearchPage />} />
               <Route path="/book/:bookId" element={<BookPage />} />
               <Route path="*" element={<Page404 />} status={404} />
            </Routes>
         </Router>
      </>
   );
}

export default App;
