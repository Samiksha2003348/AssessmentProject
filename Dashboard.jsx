import React, { useState } from 'react';
import { useData } from './Context';

const Dashboard = () => {
  const { state, dispatch } = useData();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [ratings, setRatings] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.email || !form.address) return;

    if (editingId) {
      dispatch({
        type: 'updateStore',
        payload: { id: editingId, ...form }
      });
      setEditingId(null);
    } else {
      dispatch({
        type: 'addStore',
        payload: {
          id: Date.now(),
          ...form,
          averageRating: 0
        }
      });
    }

    setForm({ name: '', email: '', address: '' });
  };

  const handleEdit = (store) => {
    setForm({ name: store.name, email: store.email, address: store.address });
    setEditingId(store.id);
  };

  const handleDelete = (id) => {
    dispatch({ type: 'deleteStore', payload: { id } });
  };

  const handleRatingChange = (storeId, ratingValue) => {
    setRatings({ ...ratings, [storeId]: ratingValue });
    dispatch({
      type: 'rateStore',
      payload: { storeId, rating: Number(ratingValue) }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      <h1 className="text-3xl font-bold text-center">Store Dashboard</h1>

      {/* Add / Edit Store */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Store' : 'Add New Store'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Store Name"
            className="border p-2 rounded"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Store' : 'Add Store'}
        </button>
      </div>

      {/* Store List with Rating */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Stores</h2>
        {state.list.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-3 px-4 border">#</th>
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Email</th>
                  <th className="py-3 px-4 border">Address</th>
                  <th className="py-3 px-4 border">Avg Rating</th>
                  <th className="py-3 px-4 border">Your Rating</th>
                  <th className="py-3 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.list.map((store, index) => (
                  <tr key={store.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{store.name}</td>
                    <td className="py-2 px-4 border">{store.email}</td>
                    <td className="py-2 px-4 border">{store.address}</td>
                    <td className="py-2 px-4 border text-center">
                      {store.averageRating || "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <select
                        className="border p-1 rounded"
                        value={ratings[store.id] || ''}
                        onChange={(e) =>
                          handleRatingChange(store.id, e.target.value)
                        }
                      >
                        <option value="">--Rate--</option>
                        {[1, 2, 3, 4, 5].map((val) => (
                          <option key={val} value={val}>{val}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 border text-center space-x-2">
                      <button
                        onClick={() => handleEdit(store)}
                        className="px-2 py-1 bg-yellow-400 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(store.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No store data available.</p>
        )}
      </div>

      {/* Logged-in Users Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Logged-In Users</h2>
        {state.users?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded shadow">
              <thead className="bg-green-100">
                <tr>
                  <th className="py-3 px-4 border">#</th>
                  <th className="py-3 px-4 border">Email</th>
                  <th className="py-3 px-4 border">Login Time</th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No user has logged in yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
