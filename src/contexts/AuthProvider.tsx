import { createContext, ReactNode, useEffect, useState } from "react";
import { PlayerInfo } from "../type/type";
import useGetPlayer from "../hooks/useGetPlayer";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

// Define an interface for the AuthProvider props
interface AuthProviderProps {
  children: ReactNode;
}
export interface AuthContextType {
  player: PlayerInfo;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerInfo>>;
  fetchPlayerInfo: (address: string) => Promise<boolean>;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { fetchPlayer } = useGetPlayer();
  const { account } = useWallet();
  const [player, setPlayer] = useState<PlayerInfo>({
    address_id: "",
    current_round: 0,
    game_finished: true,
    hero_owned: "",
    name: "",
    last_claim_time: "",
    round1_finish_time: "",
    round1_play_time: "",
    round2_finish_time: "",
    round2_play_time: "",
    round3_finish_time: "",
    round3_play_time: "",
  });

  const fetchPlayerInfo = async (address: string) => {
    const player = await fetchPlayer(address);

    if (player) {
      setPlayer(player);
      console.log("player", player);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!account) return;
    fetchPlayerInfo(account.address);

    console.log(account);
  }, [account]);

  return (
    <AuthContext.Provider value={{ player, setPlayer, fetchPlayerInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
