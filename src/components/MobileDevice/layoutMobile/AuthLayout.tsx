import React, { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";

const AuthLayout = () => {
  const address = localStorage.getItem("address");
  useEffect(() => {
    if (address) {
      redirect("/");
    }
  }, [address]);
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
