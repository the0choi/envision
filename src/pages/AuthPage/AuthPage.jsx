import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import {useState} from "react"

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true)

  function handleToggle() {
    setShowLogin(!showLogin);
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold text-white mb-3">Welcome to Project 4.</h1>
      { showLogin ?
        <LoginForm setUser={setUser} />
      :
        <SignUpForm setUser={setUser} />
      }
      <p className="text-gray-400 text-sm hover:cursor-pointer" onClick={handleToggle}>{showLogin ? `Don't have an account?` : 'Already have an account?' }</p>
    </main>
  );
}