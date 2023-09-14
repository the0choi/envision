import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="w-full p-2 flex justify-center items-center bg-white border-b-4 border-gray-400 rounded-b-xl">
      <div className="w-4/5 flex justify-between items-center xs-width">
        <Link to="/">
          <h1 className="font-bold text-3xl p-2 transition ease-in-out hover:scale-110 duration-300 text-animate logo-xs">✦&nbsp;Envision</h1>
        </Link>
        <div className="space-x-2">
          <Link to="/posts/new" className="px-4 py-2 text-white rounded-md btn-hover font-nunito link-xs">Create</Link>
          <Link to={`/users/${user._id}`} className="hover:bg-gray-300 hover:rounded-lg p-2 duration-300 font-nunito link-xs">My&nbsp;Creations</Link>
          <Link to="" className="hover:bg-gray-300 hover:rounded-lg p-2 duration-300 font-nunito link-xs" onClick={handleLogOut}>
            Log&nbsp;Out
          </Link>
        </div>
        
      </div>
    </nav>
  );
}