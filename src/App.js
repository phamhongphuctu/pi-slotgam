import React, { useState } from "react";

function App() {
  const [slots, setSlots] = useState(["🍒", "🍋", "🔔"]);
  const [user, setUser] = useState(null);

  const symbols = ["🍒", "🍋", "🔔", "🍊", "⭐", "💎"];

  const getRandomSymbol = () =>
    symbols[Math.floor(Math.random() * symbols.length)];

  const spin = () => {
    setSlots([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);
  };

  const login = async () => {
    try {
      if (!window.Pi) return alert("Not in Pi Browser");

      const isSandbox = window.location.hostname.includes("sandbox");
      await window.Pi.init({
        version: "2.0",
        sandbox: isSandbox,
        appId: "pi-slotgam"
      });
      console.log("✅ Pi SDK Initialized");

      const auth = await window.Pi.authenticate(["username"]);
      console.log("✅ Auth data:", auth);
      setUser(auth);
    } catch (err) {
      console.error("❌ Login failed:", err);
    }
  };

  const pay = () => {
    if (!window.Pi) return alert("Not in Pi Browser");

    window.Pi.createPayment(
      {
        amount: 0.01,
        memo: "Test transaction from Pi Slot Game",
        metadata: { type: "test-payment" },
      },
      {
        onReadyForServerApproval: (paymentId) => {
          console.log("✔ Ready for approval:", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("✅ Payment complete:", txid);
          alert("Thanh toán thành công!");
        },
        onCancel: (paymentId) => {
          console.log("❌ Payment cancelled:", paymentId);
        },
        onError: (error, payment) => {
          console.error("⚠ Payment error:", error);
        },
      }
    );
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
        <>
          <p>👋 Welcome, {user.user.username}</p>
          <button onClick={pay} style={{ padding: "10px 20px", marginTop: "10px" }}>
            Thanh toán Pi
          </button>
        </>
      ) : (
        <button onClick={login} style={{ padding: "10px 20px" }}>
          Login with Pi
        </button>
      )}
    </div>
  );
}

export default App;
