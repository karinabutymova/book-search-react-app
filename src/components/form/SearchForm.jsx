import axios from 'axios';
import React, { useState } from 'react';
import './SearchForm.scss';

const SearchForm = ({ result, errorMsg, totalItems, isLoading }) => {
   const [titleInput, setTitleInput] = useState('');
   const [category, setBookCategory] = useState('All');
   const [sort, setSort] = useState('relevance');

   const [apiKey] = useState("AIzaSyArvsaejhkJKVKaMHhXUFldx-6zBjbVOIw");

   // обработка изменений элементов формы
   const handleChange = (e) => {
      switch (e.currentTarget.name) {
         case 'title':
            setTitleInput(e.currentTarget.value);
            break;
         case 'category':
            setBookCategory(e.currentTarget.value);
            break;
         case 'sort':
            setSort(e.currentTarget.value);
            break;
         default:
            break;
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      isLoading(true);

      // проверка на пустоту поля input
      if (!titleInput) {
         result([]);
         errorMsg('Please, enter book title');
         isLoading(false);
      }
      else {
         searchBookQuery();
      }
   }

   // отправить форму по нажатию Enter
   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         isLoading(true);
         handleSubmit(e);
      }
   }

   const searchBookQuery = () => {
      // get запрос
      let request = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleInput}`;
      category !== 'All' ? request += `+subject:${category}&orderBy=${sort}&maxResults=30&key=${apiKey}` : request += `&orderBy=${sort}&maxResults=30&key=${apiKey}`;
      axios.get(request)
         .then(data => {
            if (data.data.items && data.data.totalItems) {
               result([]);
               errorMsg('');
               result(data.data.items);
               totalItems(data.data.totalItems);
            } else {
               category === 'all' ? errorMsg(`No books found for '${titleInput}' :(`) : errorMsg(`No books found for '${titleInput}' in this category :(`);
               totalItems('');
               result([]);
            }

            isLoading(false);
         })
         .catch(error => {
            errorMsg('Sorry, cannot connect to Google Book API. Please try again!');
            isLoading(false);
         });
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
                        value={titleInput}
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
                        value={category}
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
                        value={sort}
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
