export const requestLine = (requestData, searchParams, maxResult, apiKey) => {
   let { title, category, sort } = requestData;
   let startIndex = ~~searchParams.get('startIndex');

   // формирование запроса
   let request = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
   category !== 'All'
      ? request += `+subject:${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`
      : request += `&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${apiKey}`;
   return request;
}
export const loadMore = (searchParams, setSearchParams, maxResult) => {
   searchParams.set('startIndex', ~~searchParams.get('startIndex') + maxResult);
   setSearchParams(searchParams);
};

export const getBooksFromLocalStorage = (scroll, setTotalItems, setResult) => {

   let books = JSON.parse(localStorage.getItem("books"));
   let pageInfo = books.pop();

   scroll.scrollTo(pageInfo.offsetTop);
   setTotalItems(pageInfo.totalItems);
   setResult(books);


   localStorage.removeItem('books');
}