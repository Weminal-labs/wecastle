import React from "react";
import { NavLink } from "react-router-dom";
import PixelCustom from "../buttons/PixelCustom";

const items = [
  { text: "Home", to: "/" },
  { text: "Docs", to: "/docs" },
  { text: "Profile", to: "/profile" },
];

const SideBar = () => {
  return (
    <div className="flex w-full justify-between px-5 py-10">
      {items.map((item, index) => {
        return (
          <div key={index}>
            <PixelCustom className="pixel-button-white flex justify-center">
              <NavLink to={item.to} className="text-xl text-white !w-32 text-center py-3">
                {item.text}
              </NavLink>
            </PixelCustom>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
