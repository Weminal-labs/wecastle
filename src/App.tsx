// import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/MobileDevice/layoutMobile/Layout";
import Leaderboard from "./pages/main/LeaderBoard/Leaderboard";
import { LoginPage } from "./components/MobileDevice/Login/Login";
import { CallbackPage } from "./components/MobileDevice/layoutMobile/Callback";
import AuthLayout from "./components/MobileDevice/layoutMobile/AuthLayout";
import RequireAuth from "./components/MobileDevice/layoutMobile/RequireAuth";
import PlayGame from "./pages/main/PlayGame/PlayGamePage";
import Faucet from "./pages/main/Faucet";
import CreateAccount from "./components/layout/CreateAccout/CreateAccount";
import HomeMobile from "./components/MobileDevice/homeMobile/HomeMobile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth />}>
            {/* <Route path="/playGame" element={<PlayGame />} /> */}
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* <Route path="/faucet" element={<Faucet />} /> */}
            {/* <Route path="/create-account" element={<CreateAccount />} /> */}
            <Route path="/" element={<HomeMobile />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
        <Route path="callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
