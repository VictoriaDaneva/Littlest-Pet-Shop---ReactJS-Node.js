import { Routes, Route } from "react-router";
import Header from "./components/Heather/Header";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About-us/About-us";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
