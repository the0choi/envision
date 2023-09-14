import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import ImageReel from '../../components/ImageReel/ImageReel';
import {useState} from "react"

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true)

  function handleToggle() {
    setShowLogin(!showLogin);
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="typed-container">
        <h1 className="text-xl text-white mb-3 typed welcome-msg">Welcome to <span className="text-animate font-bold">Envision</span>.</h1>
      </div>

      { showLogin ?
        <LoginForm setUser={setUser} />
      :
        <SignUpForm setUser={setUser} />
      }
      <p className="text-gray-400 text-sm hover:cursor-pointer acc-msg" onClick={handleToggle}>{showLogin ? `Don't have an account?` : 'Already have an account?' }</p>
      <ImageReel />
    </main>
  );
}