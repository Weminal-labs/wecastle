import { MdOutlineShoppingCart } from "react-icons/md";
import PixelCustom from "../../buttons/PixelCustom";
import { FaRegClock } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeMobile = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center px-8">
      <div className="flex w-full flex-grow flex-col justify-center py-16 text-white">
        {/* game */}
        <div className="relative aspect-video w-full border-2 border-black p-4">
          <img
            src="/game-map/wecastle-map-1.png"
            className="absolute left-0 top-0 z-0 h-full w-full object-cover brightness-75"
          />
          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            <div className="w-full text-2xl">Map: 01</div>
            <div className="flex w-full justify-end">
              <Link
                to="/playGame"
                className="border-2 border-white px-10 py-2 text-2xl hover:bg-white"
              >
                Play
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <h1 className="py-10 text-3xl">Activities</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex aspect-square w-full flex-col items-center space-y-2 border-2 border-black bg-mainColor p-4 text-[#CACACA]">
              <div className="flex flex-grow flex-col items-center justify-center">
                <MdOutlineShoppingCart className="text-5xl" />
                <h1 className="text-2xl">marketplace</h1>
              </div>
              <PixelCustom>
                <button className="w-32 bg-white text-2xl text-black">
                  Open
                </button>
              </PixelCustom>
            </div>
            <div className="flex aspect-square w-full flex-col items-center space-y-4 border-2 border-black bg-mainColor p-4 text-xl">
              <div className="flex w-full flex-grow flex-col border-2 border-black bg-white">
                <div className="flex items-center justify-center bg-[#9F9F9F] text-black">
                  <FaRegClock />
                  23h30m
                </div>
                <div className="flex flex-grow items-center justify-center space-x-2 bg-white text-black">
                  <FaKey />
                  <p className=" ">3 credits</p>
                </div>
              </div>
              <PixelCustom>
                <button className="w-32 bg-white text-2xl text-black">
                  Claim
                </button>
              </PixelCustom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMobile;
