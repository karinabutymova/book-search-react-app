import React, { useEffect } from 'react';
import './SearchForm.scss';

import { useSearchParams } from 'react-router-dom';

const SearchForm = ({ setRequestData }) => {
   const [searchParams, setSearchParams] = useSearchParams({ title: '', category: 'All', sort: 'relevance', startIndex: 0 });

   useEffect(() => {
      if (localStorage.getItem("books"))
         fetchData();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const fetchData = () => {
      let { title, category, sort } = Object.fromEntries([...searchParams]);

      setRequestData({ title, category, sort });
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

      // обнуление пагинации
      searchParams.set('startIndex', 0);
      setSearchParams(searchParams);

      fetchData();
   }

   // отправить форму по нажатию Enter
   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         handleSubmit(e);
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
