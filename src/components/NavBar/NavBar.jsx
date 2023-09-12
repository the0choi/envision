import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="w-full p-4 sm:px-8 flex justify-center items-center">
      <div className="w-2/3 flex justify-between items-center">
        <Link to="/">
          <img src="https://img.logoipsum.com/297.svg" alt="logo" className="w-28 object-contain inline-block"/>
        </Link>
        <div className="space-x-2">
          <Link to="/posts/new" className="font-inter font-bold bg-[#6469ff] text-white px-4 py-2 rounded-md btn-hover mr-1">Create</Link>
          <Link to={`/users/${user._id}`} className="hover:bg-gray-300 hover:rounded-lg p-2">My Creations</Link>
          <Link to="" className="hover:bg-gray-300 hover:rounded-lg p-2" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
        
      </div>
    </nav>
  );
}