import NavBar from "./components/Navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="bg-gradient-to-t from-purple-900 via-pink-900 to-sky-900 min-h-lvh text-white font-mono">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
