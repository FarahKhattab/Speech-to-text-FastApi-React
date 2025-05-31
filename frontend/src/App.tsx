import "./App.css";
import Header from "./components/header";
import HeroSection from "./components/herosection";
import Body from "./components/body";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://speech-to-text-fastapi-react.onrender.com/ping", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => console.log("Ping response:", data))
        .catch((err) => console.error("Ping failed:", err));
    }, 4 * 60 * 1000); // Every 4 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <Body />
    </>
  );
}

export default App;
