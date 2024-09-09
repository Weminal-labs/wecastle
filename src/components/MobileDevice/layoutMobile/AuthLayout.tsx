import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const address = localStorage.getItem("address")
  const nav = useNavigate()
  useEffect(()=>{
    if(address){
      nav("/")
    }

  },[])
  return (
    <div className="flex h-[100vh]  items-center justify-center">
        <Outlet />
    </div>
  );
};

export default AuthLayout;
