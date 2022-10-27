import axios from 'axios';

export const categoryJoin = (book) => book.volumeInfo.categories.join('/');
export const authorsJoin = (book) => book.volumeInfo.authors.join(', ');
export const axoisRequest = bookId => axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)