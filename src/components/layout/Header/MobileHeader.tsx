import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "../../../utils/Shorten";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Button } from "@mui/material";

const MobileHeader = () => {
  const [address, setAddress] = useState(localStorage.getItem("address") ?? "");

  return (
    <header className="flex w-full flex-row items-center justify-between py-4 px-4">
      <div className="flex flex-1 justify-center">
        <h2 className="font-vt323 flex items-center space-x-2 text-6xl text-white">
          <ContentCopy onClick={() => navigator.clipboard.writeText(address)} />
          <span className="text-lg">{shortenAddress(address, 5)}</span>
        </h2>
      </div>
      <MenuIcon className="!text-4xl text-white" />
    </header>
  );
};

export default MobileHeader;
