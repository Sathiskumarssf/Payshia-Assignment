import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Removed the unused imports

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/register", formData);
      console.log(res.data);

      // Adjust the condition according to the actual response structure
      if (res.data.message === "user saved") {
        navigate('/login');
      }

    } catch (err) {
      console.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 justify-center min-h-screen">
      <div className="bg-white pr-24 pl-24 pt-10 pb-10 rounded-3xl flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="flex flex-col w-full max-w-xs" onSubmit={handleSubmit}>
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 p-2 border rounded border-slate-400"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
