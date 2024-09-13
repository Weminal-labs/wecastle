import useGetPlayer from "../../../hooks/useGetPlayer";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";
import { PlayerInfo } from "../../../type/type";

const Profile = () => {
  const address = localStorage.getItem("address") ?? "";
  const { fetchPlayer } = useGetPlayer();
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    address_id: '',
    current_round: 0,
    game_finished: true,
    hero_owned: '',
    name: '',
    round1_finish_time: '',
    round1_play_time: '',
    round2_finish_time: '',
    round2_play_time: '',
    round3_finish_time: '',
    round3_play_time: ''
  })

  useEffect(() => {
    fetchPlayerInfo(address);
  }, [address]);

  const fetchPlayerInfo = async (address: string) => {
    const player = await fetchPlayer(address);
    const aptosConfig = new AptosConfig({ network: Network.TESTNET });
    const aptos = new Aptos(aptosConfig);

    if (player) {
      setPlayerInfo(player);
      console.log('player', player)
    }
  };

  return (
    <div className="mx-auto flex h-[90vh] w-full max-w-screen-sm flex-col items-center px-8 pt-20 ">
      <div className="flex flex-col items-center h-[120px] gap-2">
        <div className="w-full flex flex-row items-center gap-2">
          <div className="w-[120px] h-[125px] border-2 border-black">
            <img src="/logo.png" alt="logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-[182px] h-[50px] text-lg text-white border-2 border-black bg-[#C48D5D] p-2">
              <div className="my-[-5px]">Name: {playerInfo.name}</div>
              <div>Username: {playerInfo.name}</div>
            </div>
            <div className="w-[182px] h-[70px] text-lg text-white border-2 border-black bg-[#C48D5D] p-2">
              <div className="my-[-5px]">Map: {playerInfo.name}</div>
              <div className="mb-[-5px]">Chest: {playerInfo.name}</div>
              <div>Gold: {playerInfo.name}</div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[300px] text-lg text-white border-2 border-black bg-[#C48D5D] p-5">
          <p className="p-2 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada metus nec ultrices efficitur. Integer egestas odio ante, ac iaculis est ornare in. Fusce maximus sollicitudin volutpat. Nunc molestie mollis nulla in scelerisque. Morbi in nibh ac est imperdiet auctor a ac lacus. Sed et ipsum mi. Proin ac imperdiet nulla, eu bibendum ante. Nam quis nisl quam.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
