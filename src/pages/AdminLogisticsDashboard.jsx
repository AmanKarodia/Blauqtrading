import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../backend/utils/axiosWithAuth';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const STATUSES = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

function AdminLogisticsDashboard() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentUser) return;

      try {
        const axiosInstance = await axiosWithAuth(); // This returns axios instance with interceptor
        const res = await axiosInstance.get('/logistics');
        // const res = await axiosWithAuth.get('/logistics');
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to load logistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axiosWithAuth.patch(`/logistics/${id}`, { status: newStatus });

      await axiosWithAuth.post('/audit-log', {
        requestId: id,
        action: 'Status Updated',
        newStatus,
      });

      // Refresh state locally
      setRequests(prev =>
        prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Error updating status');
    }
  };

  const exportCSV = () => {
    if (requests.length === 0) {
      alert('No data to export');
      return;
    }

    const grouped = {};
    requests.forEach((req) => {
      const region = req.region || 'Unassigned';
      if (!grouped[region]) grouped[region] = [];
      grouped[region].push(req);
    });

    let csv = 'Region,Name,Contact,Pickup,Delivery,Goods,Date,Status,PhotoURL\n';
    Object.keys(grouped).forEach(region => {
      grouped[region].forEach(req => {
        const esc = (str) => `"${(str || '').toString().replace(/"/g, '""')}"`;
        csv += [
          esc(region),
          esc(req.name),
          esc(req.contact),
          esc(req.pickup),
          esc(req.delivery),
          esc(req.goods),
          esc(req.date),
          esc(req.status),
          esc(req.photoURL || '')
        ].join(',') + '\n';
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'logistics_requests_by_region.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const regionSummary = requests.reduce((acc, req) => {
    const region = req.region || 'Unassigned';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  const deliveriesByRegion = requests.reduce((acc, req) => {
    if (req.status === 'Completed' || req.status === 'Delivered') {
      const region = req.region || 'Unassigned';
      acc[region] = (acc[region] || 0) + 1;
    }
    return acc;
  }, {});
  const leaderboard = Object.entries(deliveriesByRegion)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  if (loading) return <p className="p-4 text-lg">Loading requests...</p>;

  return (
    <>
      <Navbar />
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          📦 Logistics Requests (Admin)
        </h2>

        <div className="mb-4">
          <h3 className="font-semibold text-lg">
            📍 Showing requests for region:{' '}
            <span className="font-bold">
              {currentUser.role === 'driver' ? currentUser.region : 'All Regions'}
            </span>
          </h3>
          <p className="text-sm text-gray-300">Admins and Managers see all regions.</p>
        </div>

        {(currentUser.role === 'admin' || currentUser.role === 'manager') && (
          <div className="mb-6 bg-neutral-700 rounded p-4 text-white shadow">
            <h3 className="font-bold mb-2">📊 Requests per Region</h3>
            <ul className="list-disc list-inside">
              {Object.entries(regionSummary).map(([region, count]) => (
                <li key={region}>
                  <span className="font-semibold">{region}:</span> {count} request{count !== 1 && 's'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(currentUser.role === 'admin' || currentUser.role === 'manager') && (
          <div className="mb-4">
            <button
              onClick={exportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export CSV by Region
            </button>
          </div>
        )}

        {(currentUser.role === 'admin' || currentUser.role === 'manager') && (
          <div className="mb-6 bg-neutral-700 rounded p-4 text-white shadow">
            <h3 className="font-bold mb-2">🏆 Top Regions by Completed Deliveries</h3>
            <ol className="list-decimal list-inside">
              {leaderboard.length === 0 && <li>No deliveries yet.</li>}
              {leaderboard.map(([region, count]) => (
                <li key={region}>
                  <strong>{region}</strong>: {count} delivery{count !== 1 && 'ies'}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="overflow-x-auto bg-neutral-800 rounded shadow border">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-800 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Pickup</th>
                <th className="p-3 text-left">Delivery</th>
                <th className="p-3 text-left">Goods</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Region</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Photo</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{req.name}</td>
                  <td className="p-3">{req.contact}</td>
                  <td className="p-3">{req.pickup}</td>
                  <td className="p-3">{req.delivery}</td>
                  <td className="p-3">{req.goods}</td>
                  <td className="p-3">{req.date}</td>
                  <td className="p-3">{req.region || 'N/A'}</td>
                  <td className="p-3">
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    >
                      {STATUSES.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    {req.photoURL ? (
                      <a
                        href={req.photoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Photo
                      </a>
                    ) : (
                      'No Photo'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <p className="p-4 text-gray-500">No logistics requests found.</p>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <button
            onClick={() => navigate('/admin/audit-logs')}
            className="text-yellow-500 underline hover:text-yellow-600"
          >
            📄 View Audit Logs
          </button>
          <button
            onClick={() => navigate('/admin/settings')}
            className="text-yellow-500 underline hover:text-yellow-600"
          >
            ⚙️ Admin Settings
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLogisticsDashboard;