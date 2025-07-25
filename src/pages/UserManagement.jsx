import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [filterUsers]);

  useEffect(() => {
    filterUsers();
  }, [search, roleFilter, users]);

  const filterUsers = () => {
    let temp = [...users];

    if (search) {
      temp = temp.filter(user =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter) {
      temp = temp.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(temp);
  };

  const handleFieldUpdate = async (uid, field, value) => {
    setUpdating(true);
    try {
      const ref = doc(db, 'users', uid);
      await updateDoc(ref, { [field]: value });
      await fetchUsers();
    } catch (err) {
      alert(`Failed to update ${field}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (uid) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      await deleteDoc(doc(db, 'users', uid));
      await fetchUsers();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">👥 User Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="driver">Driver</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border bg-white shadow rounded overflow-hidden">
        <thead className="bg-neutral-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Region</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{user.name || '-'}</td>
              <td className="p-3">{user.email}</td>

              {/* Role dropdown */}
              <td className="p-3">
                <select
                  value={user.role}
                  onChange={(e) => handleFieldUpdate(user.id, 'role', e.target.value)}
                  disabled={updating}
                  className="border rounded px-2 py-1"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="driver">Driver</option>
                  <option value="user">User</option>
                </select>
              </td>

              {/* Region dropdown */}
              <td className="p-3">
                <select
                  value={user.region || ''}
                  onChange={(e) => handleFieldUpdate(user.id, 'region', e.target.value)}
                  disabled={updating}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Unassigned</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  <option value="Limpopo">Limpopo</option>
                  <option value="Zone A">Zone A</option>
                  <option value="Zone B">Zone B</option>
                  <option value="Zone C">Zone C</option>
                </select>
              </td>

              {/* Remove button */}
              <td className="p-3">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <p className="mt-4 text-gray-500">No users match the current filters.</p>
      )}
    </div>
  );
};

export default UserManagement