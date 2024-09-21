import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "../../../utils/Shorten";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {
  const [openToolTip, setOpenToolTip] = useState(true);
  const [address, setAddress] = useState(localStorage.getItem("address") ?? "");
  const { disconnect } = useWallet();
  const navigate = useNavigate();

  return (
    <header className="flex w-full flex-row items-center justify-between px-4 py-4">
      <div
        className="cursor-pointer text-3xl text-white"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoIosArrowBack />
      </div>
      <div className="flex flex-1 justify-center">
        <h2 className="font-vt323 flex items-center space-x-2 text-6xl text-white">
          <Tooltip
            open={openToolTip}
            onClose={() => {
              setOpenToolTip(false);
            }}
            onOpen={() => {
              setOpenToolTip(true);
            }}
            title="Copied!"
          >
            <>
              <ContentCopy
                onClick={() => {
                  setOpenToolTip(true);
                  navigator.clipboard.writeText(address);
                }}
                className="cursor-pointer"
              />
              <span className="text-lg">{shortenAddress(address, 5)}</span>
            </>
          </Tooltip>
        </h2>
      </div>
      <div onClick={disconnect} className="cursor-pointer">
        <MenuIcon className="!text-4xl text-white" />
      </div>
    </header>
  );
};

export default MobileHeader;
