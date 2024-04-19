import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/signup';
import Login from './components/login';
import HomeMain from './components/homemain';
import Navbar from './components/navbar';
import CreateAuction from './components/createauction';
import ProfilePage from './components/profile';
import ChangePassword from './components/changepassword'; // Import the component
import BrowseAuctions from './components/browse'; // Import the Browse component
import SpecificAuction from './components/specificauction';

// import MyProfile from './components/myprofile';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLoginSuccess={() => {}} />} />
          <Route path="/home" element={<HomeMain />} />
          <Route path="/createauction" element={<CreateAuction />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/browse" element={<BrowseAuctions />} />
          {/* <Route path="/auction/:auctionId" element={<SpecificAuction />} /> */}
          <Route path="/auction/:id" element={<SpecificAuction />} />



          {/* other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const ConditionalNavbar: React.FC = () => {
  const location = useLocation();

  // Do not show Navbar on the signup and login pages
  if (['/', '/signup', '/login'].includes(location.pathname)) {
    return null;
  }

  // For all other paths, render the Navbar
  return <Navbar />;
};
