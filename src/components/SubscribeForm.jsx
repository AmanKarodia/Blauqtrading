import React, { useState } from 'react';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccess(true);

    // Simulate sending data to backend
    console.log("Subscribed email:", email);

    // Reset form (optional)
    setEmail('');
  };

  return (
    <div className="w-full mx-auto p-6 shadow-lg rounded-2xl justify-center items-center mt-20">
      <h2 className="text-4xl mb-10 text-center">Subscribe for Exclusive Updates</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-yellow-300 text-white active:text-yellow-300 py-2 rounded-lg hover:bg-zinc-950 transition"
        >
          Subscribe
        </button>
      </form>
      {success && <p className="mt-4 text-green-600 text-center">Thank you for subscribing!</p>}
    </div>
  );
};

export default SubscribeForm;
