import React from 'react';
import { Link } from 'react-router-dom';
import Gif404 from '../../assets/images/page404.gif';

import './Page404.scss';

const Page404 = () => {
   return (
      <>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-12 col-md-8 col-lg-6 page-404">
                  <img className='gif-404' src={Gif404} alt="404" />
                  <p className=' text-404'>We can't seem to find the page you're looking for :( </p>
                  <Link className='more-button' to={"/"}> Go back to search </Link>
               </div>
            </div>
         </div>
      </>
   )
}

export default Page404;