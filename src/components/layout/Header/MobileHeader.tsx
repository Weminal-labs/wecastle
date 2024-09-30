import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "../../../utils/Shorten";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState, useRef } from "react";
import { Button, Tooltip } from "@mui/material";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import PixelCustom from "../../buttons/PixelCustom";
import clsx from "clsx";

const MobileHeader = () => {
  const [openToolTip, setOpenToolTip] = useState(false);
  const { disconnect } = useWallet();
  const navigate = useNavigate();
  const { connected, account } = useWallet();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownOpen(false);
      }
    };

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

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
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => {
            setIsDropDownOpen(!isDropDownOpen);
          }}
          className="cursor-pointer"
        >
          {isDropDownOpen ? (
            <LiaTimesSolid className="!text-4xl text-white" />
          ) : (
            <MenuIcon className="!text-4xl text-white" />
          )}
        </div>

        <div
          className={clsx(
            "absolute right-0 top-full translate-y-2",
            isDropDownOpen ? "absolute" : "hidden",
          )}
        >
          <PixelCustom>
            <div className="flex flex-col space-y-4 bg-[#C48D5D] px-6 py-4">
              <PixelCustom>
                <button
                  className="flex whitespace-nowrap bg-white px-6 py-1"
                  onClick={disconnect}
                >
                  Log Out
                </button>
              </PixelCustom>
            </div>
          </PixelCustom>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
