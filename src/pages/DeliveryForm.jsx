import React, { useState } from 'react';
import { db } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axiosWithAuth from '../../backend/utils/axiosWithAuth';
import { getAuth } from 'firebase/auth';
import Navbar from '../components/Navbar';

function DeliveryForm() {
  const [form, setForm] = useState({
    name: '',
    email:'',
    contact: '',
    pickup: '',
    delivery: '',
    goods: '',
    date: '',
  });
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setUploading(true);

  const auth = getAuth();
  if (!auth.currentUser) {
    alert('You must be logged in to submit a request.');
    setUploading(false);
    return;
  }

  try {
    let photoURL = '';
    if (photo) {
      const storage = getStorage();
      const storageRef = ref(storage, `logistics_photos/${Date.now()}_${photo.name}`);
      await uploadBytes(storageRef, photo);
      photoURL = await getDownloadURL(storageRef);
    }

    await axiosWithAuth.post('/logistics',  {
      ...form,
      photoURL,
    });

    alert('Request submitted!');
    setForm({ name: '', email: '', contact: '', pickup: '', delivery: '', goods: '', date: '' });
    setPhoto(null);
  } catch (error) {
    console.error('Submission error:', error);
    alert('Failed to submit request');
  } finally {
    setUploading(false);
  }
};

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen">
    <div className="max-w-2xl mx-auto bg-neutral-700 p-6 mt-10 rounded">
      <h1 className="text-2xl font-bold mb-6">Request Logistics Service</h1>
      <p className="text-md font-medium mt-2">
        Delivery Fee: <span className="font-bold">R42 (Flat Rate)</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact Number" className="w-full p-2 border rounded" />
        <input name="pickup" value={form.pickup} onChange={handleChange} required placeholder="Pickup Address" className="w-full p-2 border rounded" />
        <input name="delivery" value={form.delivery} onChange={handleChange} required placeholder="Delivery Address" className="w-full p-2 border rounded" />
        <input name="goods" value={form.goods} onChange={handleChange} required placeholder="Type of Goods" className="w-full p-2 border rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        {/* Photo Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Photo (required)</label>
          <input type="file" required accept="image/*" onChange={handlePhotoChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" disabled={uploading} className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-600">
          {uploading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
    </div>
  </>
  )
};

export default DeliveryForm