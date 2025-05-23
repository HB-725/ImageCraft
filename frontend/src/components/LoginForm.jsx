import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const adminUsername = "plusalsostudios";
    const adminPassword = "plusalsostudiosblakehao";

    if (username === adminUsername && password === adminPassword) {
      const token = "plusalsostudioshastoken";
      localStorage.setItem("token", token);
      onLogin(token);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded"
        style={{ width: "300px", background: "white", display: "block" }}
      >
        <h4 className="mb-3 text-center">Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="text-center mt-3">
        <small>
          Please use login credentials provided by the email you received.
        </small>
      </div>
    </div>
  );
};

export default LoginForm;
