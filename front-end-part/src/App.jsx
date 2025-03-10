import { Routes, Route } from "react-router";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
