import React from 'react';
import { useParams } from 'react-router-dom';

const BookPage = () => {
   const { bookId } = useParams();

   return (
      <div>
         Book page: <strong>{bookId}</strong>
      </div>
   );
};

export default BookPage;