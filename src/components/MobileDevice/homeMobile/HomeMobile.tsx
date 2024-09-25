import { MdOutlineShoppingCart } from "react-icons/md";
import PixelCustom from "../../buttons/PixelCustom";
import { FaRegClock } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useCredit from "../../../hooks/useCredit";
import Timer from "../../timer/Timer";
import AuthContext from "../../../contexts/AuthProvider";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const maps = [
  {
    id: 1,
    image: "/game-map/wecastle-map-1.png",
  },
  {
    id: 2,
    image: "/game-map/wecastle-map-1.png",
  },
  {
    id: 3,
    image: "/game-map/wecastle-map-1.png",
  },
];

const HomeMobile = () => {
  const navigate = useNavigate();
  const { fetchCredit, claimCredit } = useCredit();
  const auth = useContext(AuthContext);
  const { connected, account } = useWallet();

  const [CreditInfor, setCreditInfor] = useState<number>(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());

  useEffect(() => {
    if (!account) return;
    fetchCreditInfor(account.address);
  }, [account]);

  const fetchCreditInfor = async (address: string) => {
    const credit = await fetchCredit(address);

    if (credit) {
      setCreditInfor(credit);
      console.log("credit", credit);
    }
  };

  const handleClaimCredit = async () => {
    if (!account) return;
    await claimCredit();
    const credit = await fetchCredit(account.address);

    if (credit) {
      setCreditInfor(credit);
      console.log("credit", credit);
    }
  };

  useEffect(() => {
    if (!auth) return;

    const test = new Date(
      Number(auth.player.last_claim_time) / 1000 + 86400000,
    );

    setExpiryTimestamp(test);
  }, [auth]);

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center px-8">
      <div className="flex w-full flex-grow flex-col justify-center py-16 text-white">
        {/* game */}
        <div className="relative aspect-video w-full border-2 border-black p-4">
          <img
            src={
              maps.find((map) => {
                return (
                  map.id ===
                  (auth?.player.game_finished || auth?.player.current_round == 0
                    ? auth?.player.current_round + 1
                    : auth?.player.current_round)
                );
              })?.image
            }
            className="absolute left-0 top-0 z-0 h-full w-full object-cover brightness-75 shadow-inner"
          />
          <div className="relative z-10 flex h-full w-full flex-col justify-between">
            <div className="w-full text-2xl">
              Current Map: 0
              {auth?.player.game_finished || auth?.player.current_round == 0
                ? auth?.player.current_round + 1
                : auth?.player.current_round}
            </div>
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
                <button
                  className="w-32 bg-white text-2xl text-black"
                  onClick={() => navigate("/marketplace")}
                >
                  Open
                </button>
              </PixelCustom>
            </div>
            <div className="flex aspect-square w-full flex-col items-center space-y-4 border-2 border-black bg-mainColor p-4 text-xl">
              <div className="flex w-full flex-grow flex-col border-2 border-black bg-white">
                <div className="flex items-center justify-center space-x-1 bg-[#9F9F9F] text-black">
                  {new Date() < expiryTimestamp && (
                    <>
                      <FaRegClock />
                      <Timer expiryTimestamp={expiryTimestamp} />
                    </>
                  )}
                </div>
                <div className="flex flex-grow items-center justify-center space-x-2 bg-white text-black">
                  <FaKey />
                  <p className=" ">{CreditInfor} credits</p>
                </div>
              </div>
              <PixelCustom>
                <button
                  className="w-32 bg-white text-2xl text-black disabled:cursor-not-allowed disabled:text-gray-500 disabled:opacity-80"
                  onClick={handleClaimCredit}
                  disabled={new Date() < expiryTimestamp}
                >
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
