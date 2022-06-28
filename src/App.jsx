import './App.css';
import logo from './images/logo.png';
import BackgroundSvg from './components/BackgroundSvg';
import SearchForm from './components/form/SearchForm';

function App() {
   return (
      <div className="app">
         <BackgroundSvg />
         <div className="container">
            <div className="row justify-content-center">
               <div className='col-4 logo-title'>
                  <img src={logo} alt="" />
                  <h1>Book<span>Search</span></h1>
               </div>
            </div>
         </div>

         <SearchForm />
      </div>
   );
}

export default App;
