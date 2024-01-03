import { Link } from 'react-router-dom';
import logo from '/images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilter } from '../app/features/filter/filterSlice';

export default function Navbar() {
   const { search } = useSelector((state) => state.filter);
   const dispatch = useDispatch();

   return (
      <nav className="container relative py-3">
         <div className="flex items-center justify-between">
            <Link to={'/'}>
               <img src={logo} />
            </Link>
            <div className="flex-1 max-w-xs search-field group">
               <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
               <input
                  style={{ color: '#000' }}
                  type="text"
                  placeholder="Search Task"
                  className="search-input"
                  id="lws-searchTask"
                  value={search}
                  onChange={(e) => dispatch(searchFilter(e.target.value))}
               />
            </div>
         </div>
      </nav>
   );
}
