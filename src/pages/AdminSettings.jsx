import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function AdminSettings() {
  const [settings, setSettings] = useState({
    deliveryFee: '',
    acceptingRequests: true,
    customNote: '',
    operatingHours: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'admin_settings', 'logistics');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    const docRef = doc(db, 'admin_settings', 'logistics');
    await updateDoc(docRef, {
      ...settings,
    });
    alert('Settings updated!');
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-neutral-800 rounded">
      <h2 className="text-2xl font-bold mb-6">⚙️ Admin Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Delivery Fee (ZAR)</label>
          <input
            type="number"
            name="deliveryFee"
            value={settings.deliveryFee}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Operating Hours</label>
          <input
            type="text"
            name="operatingHours"
            value={settings.operatingHours}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Custom Note</label>
          <textarea
            name="customNote"
            value={settings.customNote}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="acceptingRequests"
            checked={settings.acceptingRequests}
            onChange={handleChange}
          />
          <label>Accepting New Logistics Requests</label>
        </div>

        <button
          onClick={handleSave}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings