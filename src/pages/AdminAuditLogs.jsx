import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'admin_audit_logs'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📝 Admin Audit Logs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-neutral-800 text-white">
              <th className="p-3">Request ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Updated By</th>
              <th className="p-3">Previous Status</th>
              <th className="p-3">New Status</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{log.requestId}</td>
                <td className="p-3">{log.userId || '-'}</td>
                <td className="p-3">{log.updatedBy || 'system'}</td>
                <td className="p-3">{log.previousStatus || '-'}</td>
                <td className="p-3">{log.newStatus || '-'}</td>
                <td className="p-3">
                  {log.timestamp?.toDate().toLocaleString() || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <p className="mt-4 text-gray-500">No audit logs found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAuditLogs