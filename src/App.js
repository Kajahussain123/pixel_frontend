import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Benefit from './Pages/Benefit';
import BuyNow from './Pages/BuyNow';
import HowItWorks from './Pages/HowItWorks';
import Event from './Pages/Event';
import Checkout from './Pages/Checkout';
import ContactUS from './Pages/ContactUS';
import AdminHome from './Admin/Pages/Home';
import Users from './Admin/Pages/Users';
import Orders from './Admin/Pages/Orders';
import Messages from './Admin/Pages/Messages';
import AdminMessages from './Pages/Messages';
import Signup from './Pages/Register';
import Login from './Pages/Login';
import Pixels from './Admin/Pages/Pixels';
import AdminLogin from './Admin/Pages/AdminLogin';
import WhatWeOffer from './Pages/WhatWeOffer';
import OrderConfirmedPage from './Pages/OrderConfirmed';
import VerifyOtp from './Pages/VerifyOTP';
import AdminPrivateRoute from './AdminPrivateRoute';
import AdminBuyPixel from './Admin/Pages/BuyPixel';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/benefit" element={<Benefit />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/event" element={<Event />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contactus" element={<ContactUS />} />
        <Route path="/admin-messages" element={<AdminMessages />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/whatweoffer" element={<WhatWeOffer />} />
        <Route path="/confirmed" element={<OrderConfirmedPage />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />



        {/* Admin Login Route */}
        <Route path="/adminLogin" element={<AdminLogin />} />

        {/* Admin Private Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user-messages" element={<Messages />} />
          <Route path="/pixels" element={<Pixels />} />
          <Route path="/buy-pixels" element={<AdminBuyPixel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;