// import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/MobileDevice/layoutMobile/Layout";
import { LoginPage } from "./components/MobileDevice/Login/Login";
import { CallbackPage } from "./components/MobileDevice/layoutMobile/Callback";
import AuthLayout from "./components/MobileDevice/layoutMobile/AuthLayout";
import RequireAuth from "./components/MobileDevice/layoutMobile/RequireAuth";
import PlayGame from "./components/MobileDevice/PlayGame/PlayGame";
import CreateAccount from "./components/CreateAccout/CreateAccount";
import HomeMobile from "./components/MobileDevice/homeMobile/HomeMobile";
import Profile from "./components/MobileDevice/profile/Profile";
import Marketplace from "./components/MobileDevice/marketplace/Marketplace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            <Route path="/playGame" element={<PlayGame />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/" element={<HomeMobile />} />
          </Route>
        </Route>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
