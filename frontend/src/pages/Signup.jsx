import { useState } from "react";
import { postJSON } from "../api";

export default function Signup({ onSignedUp, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all the boxes.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { ok, data } = await postJSON("/api/register", { name, email, password });
      if (ok) {
        onSignedUp();
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Can't reach the server. Is Flask running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit}>
        <p className="brand">CS COMPUTING SOCIETY</p>
        <h1>Create an account</h1>
        <p className="sub">Join the society in one minute</p>

        {error && <p className="error">{error}</p>}

        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p className="switch">
          Already have an account?{" "}
          <button type="button" className="link" onClick={goToLogin}>
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}