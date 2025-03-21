import { Routes, Route } from "react-router";
import Header from "./components/Heather/Header";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About-us/About-us";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Reserve from "./components/Reserve/Reserve";
import Profile from "./components/Profile/Profile";
import ChekOut from "./components/ChekOut/ChekOut";
import Pets from "./components/Pets/Pets";
import Create from "./components/Create/Create";
import Pet from "./components/Pet/Pet";
import ThankYou from "./components/ThankYou/ThankYou";
import ErrorPage from "./components/404/404";
import SearchPage from "./components/Search/Search";
import UserProvider from "./providers/UserProviders";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestRouter";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pet" element={<Pet />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/search" element={<SearchPage />} />

        <Route element={<AuthGuard />}>
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkOut" element={<ChekOut />} />
          <Route path="/create" element={<Create />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </UserProvider>
  );
}
export default App;
