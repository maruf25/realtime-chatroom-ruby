import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("user_id");

    if (name && userId) {
      setUserId(userId);
      setName(name);
      navigate("/rooms");
    }

    setName("");
    setUserId("");
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      localStorage.setItem("name", data.user.name);
      localStorage.setItem("user_id", data.user.id);

      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login or Create Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login Or Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
