import React, { useEffect } from 'react';
import './SearchForm.scss';

import { useSearchParams } from 'react-router-dom';

const SearchForm = ({ setRequestData, setStartIndex }) => {
   const [searchParams, setSearchParams] = useSearchParams({ title: '', category: 'All', sort: 'relevance' });

   useEffect(() => {
      if (searchParams.get('title'))
         fetchData();
   }, []);

   const fetchData = () => {
      setRequestData(Object.fromEntries([...searchParams]));
      setStartIndex(0);
   }

   // обработка изменений элементов формы
   const handleChange = (e) => {
      switch (e.currentTarget.name) {
         case 'title':
            e.currentTarget.value ? searchParams.set('title', e.currentTarget.value) : searchParams.delete('title');
            break;
         case 'category':
            searchParams.set('category', e.currentTarget.value);
            break;
         case 'sort':
            searchParams.set('sort', e.currentTarget.value);
            break;
         default:
            break;
      }

      setSearchParams(searchParams);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      fetchData();
   }

   // отправить форму по нажатию Enter
   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         fetchData();
      }
   }

   return (
      <div className="search-form">
         <form onSubmit={handleSubmit}>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-12 col-md-12 col-lg-6 input-submit">
                     <input className='input'
                        type="text"
                        name="title"
                        value={searchParams.get('title')}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter book title"
                     />
                  </div>
                  <div className="col-12 col-md-12 col-lg-2 input-submit">
                     <button className='submit' type="submit">Search</button>
                  </div>
               </div>
               <div className="row justify-content-center">
                  <div className="col-12 col-md-6 col-lg-4">
                     <p className='sort-name'>Categories</p>
                     <select
                        id="sort-category"
                        name="category"
                        value={searchParams.get('category')}
                        onChange={handleChange}>
                        <option value="All">All</option>
                        <option value="Art">Art</option>
                        <option value="Biography">Biography</option>
                        <option value="Computers">Computers</option>
                        <option value="History">History</option>
                        <option value="Medical">Medical</option>
                        <option value="Poetry">Poetry</option>
                     </select>

                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                     <p className='sort-name'>Sorting by</p>
                     <select id="sort"
                        name="sort"
                        value={searchParams.get('sort')}
                        onChange={handleChange} >
                        <option value="relevance">Relevance</option>
                        <option value="newest">Newest</option>
                     </select>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}

export default SearchForm;
