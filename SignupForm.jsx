import React, { useState } from 'react';

const SignupForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (form.name.length < 20 || form.name.length > 60)
      err.name = 'Name must be 20–60 characters';

    if (form.address.length > 400)
      err.address = 'Address must be less than 400 characters';

    if (!emailRegex.test(form.email))
      err.email = 'Invalid email format';

    if (!passRegex.test(form.password))
      err.password = 'Password must be 8–16 characters, 1 uppercase, 1 special character';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Signup Success:', form);
      // Add signup logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
