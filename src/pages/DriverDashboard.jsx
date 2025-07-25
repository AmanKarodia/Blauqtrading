import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';

const STATUSES = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

function DriverDashboard() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [uploadingId, setUploadingId] = useState(null);

  useEffect(() => {
    if (!currentUser || !currentUser.region) return;

    const q = query(
      collection(db, 'logistics_requests'),
      where('region', '==', currentUser.region)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [currentUser]);

  const updateStatus = async (id, newStatus) => {
    try {
      const updates = { status: newStatus };
      if (newStatus === 'Completed') {
        updates.completedBy = currentUser.displayName || currentUser.email;
        updates.completedAt = serverTimestamp();
      }
      await updateDoc(doc(db, 'logistics_requests', id), updates);
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const uploadProof = async (e, reqId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingId(reqId);
      const storage = getStorage();
      const fileRef = ref(storage, `proofs/${reqId}_${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      await updateDoc(doc(db, 'logistics_requests', reqId), {
        proofPhoto: photoURL
      });
      alert('Proof of delivery uploaded!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    } finally {
      setUploadingId(null);
    }
  };

  const statusBadge = (status) => {
    const color = {
      Pending: 'bg-yellow-400',
      'In Progress': 'bg-blue-500',
      Completed: 'bg-green-500',
      Cancelled: 'bg-red-500'
    }[status] || 'bg-gray-500';

    return (
      <span className={`text-white px-2 py-1 rounded text-xs ${color}`}>
        {status}
      </span>
    );
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        🚚 Your Deliveries - Region: {currentUser.region}
      </h1>
      {requests.length === 0 && <p>No active requests in your region.</p>}
      <ul className="space-y-4">
        {requests.map(req => (
          <li key={req.id} className="border bg-neutral-800 text-white p-4 rounded shadow-md">
            <div className="mb-2">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Pickup:</strong> {req.pickup} {' '}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(req.pickup)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  View Map
                </a>
              </p>
              <p><strong>Delivery:</strong> {req.delivery} {' '}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(req.delivery)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  View Map
                </a>
              </p>
              <p><strong>Status:</strong> {statusBadge(req.status)}</p>
              {req.completedBy && (
                <p><strong>Completed By:</strong> {req.completedBy}</p>
              )}
              {req.proofPhoto && (
                <div className="mt-2">
                  <a
                    href={req.proofPhoto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline"
                  >
                    View Proof of Delivery
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {STATUSES.map(status => (
                <button
                  key={status}
                  disabled={req.status === status}
                  onClick={() => updateStatus(req.id, status)}
                  className={`px-3 py-1 text-sm rounded ${
                    req.status === status ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                  } ${
                    status === 'Completed' ? 'bg-green-600 text-white' :
                    status === 'In Progress' ? 'bg-blue-600 text-white' :
                    status === 'Cancelled' ? 'bg-red-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {req.status === 'Completed' && (
              <div className="mt-4">
                <label className="block mb-1 font-medium">Upload Proof of Delivery</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadProof(e, req.id)}
                  disabled={uploadingId === req.id}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriverDashboard