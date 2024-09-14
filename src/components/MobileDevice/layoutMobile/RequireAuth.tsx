import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { PlayerInfo } from "../../../type/type";
import { Aptos, AptosConfig, InputViewFunctionData, Network} from "@aptos-labs/ts-sdk";
import { MODULE_ADDRESS } from "../../../utils/Var";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const RequireAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connected, isLoading } = useWallet();
  const [progress, setProgress] = useState(0);
  const [checkUpdate, setCheckUpdate] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      }, 120);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    if(connected){
      const address = localStorage.getItem("address") ?? "";
      UpdateAccount(address);
    }
  }, [connected]);

  const UpdateAccount = async (address: string | undefined) => {
    if (address) {
      try {
        const aptosConfig = new AptosConfig({ network: Network.TESTNET });
        const aptos = new Aptos(aptosConfig);
        const payload: InputViewFunctionData = {
          function: `${MODULE_ADDRESS}::gamev1::get_player_info`,
          functionArguments: [address],
        };
        const response = await aptos.view({ payload });
        // @ts-ignore

        const info: PlayerInfo = response[0];
        console.log(info);

        setCheckUpdate(true);
      } catch (error) {
        console.log(error);
        navigate("/create-account");
        setCheckUpdate(false);
      }
    }
  };

  const ProgressBar = () => (
    <div className="w-[350px] border-2 border-dark-300">
      <div className="m-1">
        <div style={{border: "1px solid black", width: `${progress}%`, height: "30px", backgroundColor: "white"}}></div>
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
