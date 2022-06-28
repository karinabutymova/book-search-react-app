import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
   return (
      <div className="search-form">
         <form action="">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-12 col-md-12 col-lg-6 input-submit">
                     <input className='input' type="text" />
                  </div>
                  <div className="col-12 col-md-12 col-lg-2 input-submit">
                     <button className='submit' type="submit">Search</button>
                  </div>
               </div>
               <div className="row justify-content-center">
                  <div className="col-12 col-md-6 col-lg-4">
                     <p className='sort-name'>Categories</p>
                     <select name="" id="sort-category">
                        <option value="" selected>All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                     </select>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                     <p className='sort-name'>Sorting by</p>
                     <select name="" id="sort">
                        <option className='option' value="" selected>Relevance</option>
                        <option value="">Relevance</option>
                        <option value="">Relevance</option>
                        <option value="">Relevance</option>
                     </select>
                  </div>

               </div>
            </div>
         </form>
      </div>
   );
}

export default SearchForm;
