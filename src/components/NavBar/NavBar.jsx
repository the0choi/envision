import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="w-full bg-white p-4 sm:px-8 border-b border-gray-500 flex justify-center items-center">
      <div className="w-2/3 flex justify-between items-center">
        <Link to="/"><img src="https://img.logoipsum.com/297.svg" alt="logo" className="w-28 object-contain"/></Link>
        <div className="space-x-6">
          <Link to="/posts/new" className="font-inter font-bold bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </div>
        
      </div>
    </nav>
  );
}