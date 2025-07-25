 import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError('Signup failed: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-neutral-800 p-8 rounded-3xl w-full max-w-sm"
      >
        <h2 className="text-white text-2xl font-black mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-black">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border-2 border-black rounded-xl hover:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-black">Password</label>
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
          Sign Up
        </button>
        <p className="text-center mt-4 font-black text-yellow-400">
          Already have an account? <a href="/" className="text-white font-bold hover:text-black underline">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;