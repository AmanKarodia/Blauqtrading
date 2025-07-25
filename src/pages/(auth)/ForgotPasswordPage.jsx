import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMsg('Password reset email sent!');
    } catch (err) {
      setError('Failed to send reset email: ' + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleReset}
        className="bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-sm hover:border"
      >
        <h2 className="text-2xl font-black mb-6 text-center">Reset Password</h2>

        {msg && <p className="text-green-500 mb-4 text-center">{msg}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-6">
          <label className="block mb-1 text-sm font-black">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border-2 border-black rounded-xl hover:border-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full font-black border border-black bg-red-700 text-white py-2 rounded-md hover:bg-black"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;