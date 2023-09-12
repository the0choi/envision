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
      <div className="w-screen h-screen -z-10 absolute bg-animate opacity-10"></div>
      <h1 className="text-xl text-white mb-3">Welcome to <span className="text-animate font-bold">Vision</span>.</h1>
      { showLogin ?
        <LoginForm setUser={setUser} />
      :
        <SignUpForm setUser={setUser} />
      }
      <p className="text-gray-400 text-sm hover:cursor-pointer" onClick={handleToggle}>{showLogin ? `Don't have an account?` : 'Already have an account?' }</p>
      <ImageReel />
      <div className="glow-element-1"></div>
    </main>
  );
}