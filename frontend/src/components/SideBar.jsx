import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import Header from "../components/Header";
import { IoHomeOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };

  const menuItems = [
    { icon: <IoHomeOutline size={25} className="mr-4" />, text: "Home" },
    {
      icon: <MdFavoriteBorder size={25} className="mr-4" />,
      text: "Favoritos",
    },
    { icon: <MdOutlineStarHalf size={25} className="mr-4" />, text: "Avaliar" },
    { icon: <LuSettings size={25} className="mr-4" />, text: "Config" },
  ];

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm">
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Biblioteca <span className="font-bold">Pessoal</span>
        </h1>
      </div>
      <Header />

      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* o q desce*/}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Biblioteca <span className="font-bold">Virtual</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {menuItems.map(({ icon, text }, index) => {
              return (
                <div key={index} className=" py-4">
                  <li className="text-1xl flex cursor-pointer  w-[50%] rounded-md mx-auto p-2 hover:text-white hover:bg-black">
                    {icon} {text}
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
