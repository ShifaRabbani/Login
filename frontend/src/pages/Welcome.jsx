export default function Welcome({ user, onLogout }) {
  return (
    <div className="page">
      <div className="card welcome">
        <p className="brand">CS COMPUTING SOCIETY</p>
        <h1>Welcome to CS Computing Society</h1>
        <p className="hello">Hello, {user.name}! 👋</p>
        <p className="sub">You are logged in as {user.email}</p>
        <button className="btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}