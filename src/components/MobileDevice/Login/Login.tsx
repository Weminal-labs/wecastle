import React, { useEffect } from "react";
import { useAptimusFlow } from "aptimus-sdk-test/react";
import { FcGoogle } from "react-icons/fc";
import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { connected, account } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      localStorage.setItem("address", account?.address ?? "");

      navigate("/");
    }
  }, [connected]);

  const handleLogin = () => {
    const btn: HTMLElement | null = document.querySelector(".wallet-button");
    btn?.click();
  };

  return (
    <>
      <div className="hidden">
        <AntdWalletSelector />
      </div>
      <button
        className="inline-flex items-center bg-white px-5 py-2 text-center font-medium text-black"
        style={{
          boxShadow: "2px 2px 0 0 #777", // inner gray layer (right and bottom)
          border: "3px solid black", // outer black layer
        }}
        onClick={handleLogin}
      >
        <FcGoogle />
        <span className="ml-1">Sign in</span>
      </button>
    </>
  );
};
