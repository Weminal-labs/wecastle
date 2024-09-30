import { useContext } from "react";
import AuthContext from "../../../contexts/AuthProvider";

const Profile = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2">
        <div className="grid w-full grid-cols-3 items-center gap-2">
          <div className="h-full border-2 border-black">
            <img
              src="/logo.png"
              alt="logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="col-span-2 flex flex-col items-center gap-1">
            <div className="w-full border-2 border-black bg-[#C48D5D] p-2 text-lg text-white">
              <div className="my-[-5px]">Name: {auth?.player.name}</div>
              <div>Username: {auth?.player.name}</div>
            </div>
            <div className="w-full border-2 border-black bg-[#C48D5D] p-2 text-lg text-white">
              <div className="my-[-5px]">Map: {auth?.player.name}</div>
              <div className="mb-[-5px]">Chest: {auth?.player.name}</div>
              <div>Gold: {auth?.player.name}</div>
            </div>
          </div>
        </div>
        <div className="w-full border-2 border-black bg-[#C48D5D] p-5 text-lg text-white">
          <p className="p-2 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            malesuada metus nec ultrices efficitur. Integer egestas odio ante,
            ac iaculis est ornare in. Fusce maximus sollicitudin volutpat. Nunc
            molestie mollis nulla in scelerisque. Morbi in nibh ac est imperdiet
            auctor a ac lacus. Sed et ipsum mi. Proin ac imperdiet nulla, eu
            bibendum ante. Nam quis nisl quam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
