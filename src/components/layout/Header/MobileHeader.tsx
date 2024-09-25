import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "../../../utils/Shorten";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {
  const [openToolTip, setOpenToolTip] = useState(false);
  const { disconnect } = useWallet();
  const navigate = useNavigate();
  const { connected, account } = useWallet();

  useEffect(() => {
    if (!connected) {
      return;
    }
  }, [connected]);

  useEffect(() => {
    if (openToolTip) {
      setTimeout(() => {
        setOpenToolTip(false);
      }, 1000);
    }
  }, [openToolTip]);

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
        <h2 className="font-vt323 flex items-center text-6xl text-white">
          <Tooltip
            open={openToolTip}
            onOpen={() => {
              setOpenToolTip(true);
            }}
            title="Copied!"
          >
            <div className="flex items-center space-x-2">
              <ContentCopy
                onClick={() => {
                  setOpenToolTip(true);
                  if (!account) return;
                  navigator.clipboard.writeText(account?.address);
                }}
                className="cursor-pointer"
              />
              <span className="text-lg">
                {account && shortenAddress(account.address, 5)}
              </span>
            </div>
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
