import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setMessage("Please enter both username and password");
      setStatus("error");
      return;
    }

    axios.post("http://localhost:5000/login", { username, password })
      .then(response => {
        if (response.data.success) {
          setMessage(`Login successful! Welcome, ${response.data.user.username}`);
          setStatus("success");
        } else {
          setMessage("Invalid credentials");
          setStatus("error");
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setMessage("Invalid credentials");
          setStatus("error");
        } else {
          console.error("Error during login:", error);
          setMessage("An error occurred during login");
          setStatus("error");
        }
      });
  };

  return (
    <div className="App">
      <div className="login-form">
        <h1>Login</h1>
        <div className="input-field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className="submit-button" onClick={handleLogin}>
          Login
        </button>
        {message && (
          <p className={`message ${status}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;