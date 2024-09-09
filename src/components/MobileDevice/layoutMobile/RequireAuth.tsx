import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const RequireAuth = () => {
  const location = useLocation();
  const { connected, isLoading } = useWallet();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 120);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const ProgressBar = () => (
    <div className="w-full border-2 border-dark-300">
      <div className="m-1">
        <div
          style={{  
            border: "1px solid black",
            width: `${progress}%`,
            height: "30px",
          backgroundColor: "white",
          }}
        ></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-xl text-white m-2">Loading...</div>
        <ProgressBar />
      </div>
    );
  }

  return connected ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
