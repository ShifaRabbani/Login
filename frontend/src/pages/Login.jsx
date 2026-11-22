import { useState } from "react";
import { postJSON } from "../api";

export default function Login({ notice, onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both boxes.");
      return;
    }

    setLoading(true);
    try {
      const { ok, data } = await postJSON("/api/login", { email, password });
      if (ok) {
        onLogin(data.user);
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
        <h1>Welcome back</h1>
        <p className="sub">Log in to continue</p>

        {notice && <p className="success">{notice}</p>}
        {error && <p className="error">{error}</p>}

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
            placeholder="Enter your password"
          />
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="switch">
          New here?{" "}
          <button type="button" className="link" onClick={goToSignup}>
            Create an account
          </button>
        </p>
      </form>
    </div>
  );
}