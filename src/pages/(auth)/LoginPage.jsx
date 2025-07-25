import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import Beige from '../../assets/Beige.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setError('Google login failed');
      console.error(err);
    }
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
      <path d="M533.5 278.4c0-17.4-1.4-34-4-50.2H272v95.1h146.9c-6.3 33.7-25.1 62.3-53.6 81.4l86.7 67.4c50.6-46.6 81.5-115.2 81.5-193.7z" fill="#4285F4" />
      <path d="M272 544.3c72.6 0 133.6-24.1 178.1-65.6l-86.7-67.4c-24.1 16.1-55 25.7-91.4 25.7-70 0-129.3-47.2-150.5-110.5H31.5v69.4C75.3 475.3 167.9 544.3 272 544.3z" fill="#34A853" />
      <path d="M121.5 326.5c-10.4-30.9-10.4-64.2 0-95.1V162H31.5c-30.4 60.9-30.4 132.5 0 193.4l90-69z" fill="#FBBC05" />
      <path d="M272 107.7c39.5 0 75.1 13.6 103 40.3l77.1-77.1C405.6 24.6 344.6 0 272 0 167.9 0 75.3 68.9 31.5 162l90 69c21.2-63.3 80.5-110.5 150.5-110.5z" fill="#EA4335" />
    </svg>
  );

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <img
        src={Beige}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-neutral-800 p-6 sm:p-8 rounded-3xl w-full max-w-sm sm:max-w-md md:max-w-lg shadow-xl"
      >
        <h2 className="text-white text-2xl font-black mb-6 text-center">Sign In</h2>

        <div className="flex items-center justify-center mb-5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex font-black items-center justify-center gap-2 w-full bg-white border border-gray-300 text-black py-2 rounded hover:bg-gray-100 active:bg-black active:text-white"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex border-2 border-neutral-600 bg-neutral-600 w-full mb-5 rounded-full"></div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-black text-white">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border-2 border-black rounded-xl hover:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-black text-white">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border-2 border-black rounded-xl hover:border-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-black py-3 rounded-xl border-2 hover:bg-yellow-400 hover:text-black hover:border-black"
        >
          Login
        </button>

        <div className="flex border-2 border-neutral-600 bg-neutral-600 w-full mt-5 rounded-full"></div>

        <p className="mt-4 font-black text-yellow-400 text-sm sm:text-base">
          Don't have an account?{' '}
          <a href="/signup" className="text-white font-bold hover:text-black underline">
            Sign up
          </a>
        </p>
        <p className="mt-2 text-sm sm:text-base">
          <a href="/forgot-password" className="text-white font-bold hover:text-black">
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;