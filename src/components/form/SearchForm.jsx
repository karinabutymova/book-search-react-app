import axios from 'axios';
import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ result }) => {
   const [titleInput, setTitleInput] = useState('');
   const [category, setCategory] = useState('All');
   const [sort, setSort] = useState('relevance');

   const [apiKey] = useState("AIzaSyArvsaejhkJKVKaMHhXUFldx-6zBjbVOIw");


   const handleChange = (e) => {
      switch (e.currentTarget.name) {
         case 'title':
            setTitleInput(e.currentTarget.value);
            break;
         case 'category':
            setCategory(e.currentTarget.value);
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

      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titleInput}&orderBy=${sort}&key=${apiKey}&maxResults=30`)
         .then(data => {
            result(data.data.items);
         })
         .catch(error => console.log(error));
   }

   const handleKeyPress = (e) => {
      if (e.key === "Enter") handleSubmit(e);
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
                        <option value="all">All</option>
                        <option value="art">Art</option>
                        <option value="biography">Biography</option>
                        <option value="computers">Computers</option>
                        <option value="history">History</option>
                        <option value="medical">Medical</option>
                        <option value="poetry">Poetry</option>
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
