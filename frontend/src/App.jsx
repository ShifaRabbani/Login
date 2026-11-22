import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [notice, setNotice] = useState("");

  if (page === "welcome" && user) {
    return (
      <Welcome
        user={user}
        onLogout={() => {
          setUser(null);
          setPage("login");
        }}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        onSignedUp={() => {
          setNotice("Account created! Please log in.");
          setPage("login");
        }}
        goToLogin={() => setPage("login")}
      />
    );
  }

  return (
    <Login
      notice={notice}
      onLogin={(loggedInUser) => {
        setUser(loggedInUser);
        setNotice("");
        setPage("welcome");
      }}
      goToSignup={() => {
        setNotice("");
        setPage("signup");
      }}
    />
  );
}