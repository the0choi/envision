import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);    
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className="w-96">
      <div className="p-2 rounded-xl">
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          <input className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white" type="text" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
          <input className="w-full py-4 px-4 my-1 rounded-xl bg-[#1c1c1c] text-white" type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
          <button className="w-full py-4 px-4 my-1 border-solid border-transparent rounded-xl bg-white text-white font-bold btn-hover" type="submit">Log in</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}