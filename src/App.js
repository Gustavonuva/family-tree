import React from "react";
import "./App.css";
import { useAuth } from "./AuthContext";
import Login from "./components/Login/Login";
import TreeList from "./components/TreeList/TreeList";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div
          style={{ background: "linear-gradient(to right, #a0e6ff, #bdfbc6" }}
        >
          <button onClick={logout} className="logout-button">
            Logout
          </button>
          <TreeList />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
