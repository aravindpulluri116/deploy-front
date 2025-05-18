import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const API_URL = "https://deploy-front-orcin.vercel.app";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchMessage = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/user?name=${name}`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  }, [name]);

  const fetchUser = async (userId) => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/users/${userId}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [name, fetchMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello User App</h1>
        <div className="input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <h2>{message}</h2>

        <div className="user-buttons">
          <button onClick={() => fetchUser(1)}>Get User 1</button>
          <button onClick={() => fetchUser(2)}>Get User 2</button>
        </div>

        {error && <p className="error">{error}</p>}

        {userData && (
          <div className="user-info">
            <h3>User Information</h3>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
