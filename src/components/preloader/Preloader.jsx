import React from 'react';
import './Preloader.scss';

const Preloader = () => {
   return (
      <div className="row justify-content-center">
         <div className="col-6">
            <div className="box">
               <div className="container-box">
                  <span className="circle"></span>
                  <span className="circle"></span>
                  <span className="circle"></span>
                  <span className="circle"></span>
               </div>
            </div>
         </div>
      </div>
   );
}
export default Preloader;