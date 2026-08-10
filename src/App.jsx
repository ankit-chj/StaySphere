import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Account from "./pages/Account";
import MyBookings from "./pages/MyBookings";
import Settings from "./pages/Settings";
import Favourites from "./pages/Favourites";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/property/:id" element={<ProtectedRoute> <PropertyDetails />  </ProtectedRoute>} />
        <Route path="/booking/:id" element={<ProtectedRoute> <Booking />  </ProtectedRoute>} />
        <Route path="/payment/:id" element={<ProtectedRoute> <Payment /> </ProtectedRoute>} />
        <Route path="/confirmation" element={<ProtectedRoute> <Confirmation /> </ProtectedRoute>} />
        <Route path="/account" element={<Account />} />
        <Route path="/my-bookings" element={<ProtectedRoute> <MyBookings /> </ProtectedRoute>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/favourites" element={<ProtectedRoute> <Favourites /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



