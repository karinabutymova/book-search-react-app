import React from 'react';
import '../App.scss';
import matrix from '../assets/images/circle-matrix.svg';
import bookmark from '../assets/images/bookmark.svg';
// import './SearchForm.css';

const BackgroundSvg = () => {
   return (
      <div className='bg-images'>
         <div>
            <img src={matrix} alt="" className='matrix-1' />
            <img src={matrix} alt="" className='matrix-2' />
            <img src={matrix} alt="" className='matrix-3' />
            <img src={matrix} alt="" className='matrix-4' />
            <img src={matrix} alt="" className='matrix-5' />
            <img src={bookmark} alt="" className='bookmark-1' />
            <img src={bookmark} alt="" className='bookmark-2' />
            <img src={bookmark} alt="" className='bookmark-3' />
            <img src={bookmark} alt="" className='bookmark-4' />
         </div>
      </div>
   );
}

export default BackgroundSvg;