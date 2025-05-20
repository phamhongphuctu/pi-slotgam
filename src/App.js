import React, { useState, useEffect } from "react";

function App() {
  const [slots, setSlots] = useState(["🍒", "🍋", "🔔"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true });
      console.log("✅ Pi SDK Initialized");
    } else {
      console.log("❌ Pi SDK not available");
    }
  }, []);

  const symbols = ["🍒", "🍋", "🔔", "🍊", "⭐", "💎"];

  const getRandomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  const spin = () => {
    setSlots([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);
  };

  const login = () => {
    if (!window.Pi) return alert("Not in Pi Browser");
    window.Pi.authenticate(["username"], (auth) => {
      console.log("Auth data:", auth);
      setUser(auth);
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎰 Pi Slot Game</h1>
      <div style={{ fontSize: "3rem" }}>{slots.join(" | ")}</div>
      <button onClick={spin} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Spin
      </button>
      <br />
      <br />
      {user ? (
        <p>👋 Welcome, {user.user.username}</p>
      ) : (
        <button onClick={login} style={{ padding: "10px 20px" }}>
          Login with Pi
        </button>
      )}
    </div>
  );
}

export default App;