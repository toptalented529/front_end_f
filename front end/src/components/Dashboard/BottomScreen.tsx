// import { Item } from "./pages/ItemDetail";

import { useEffect } from "react";
import template from "../../assets/images/template.png";
import { freetemplateItems } from "../../data";
import { useNavigate } from "react-router-dom";
/* main app */
export default function BottomScreen(): JSX.Element {
  useEffect(() => {
    /// get user information from axios or localstorage ////////////////////
  });
  const navigate = useNavigate()

  const handleClickSpace = (index:number) => {
    navigate(`/item/${index}`)
  }
  return (
    <div className="flex flex-col h-auto  p-4 w-[80vw] mt-[5vh] ml-[2vw] bg-gradient-to-r from-[#212121] to-[#0a090a] items-start rounded-xl justify-start">
      <div className="flex flex-row  w-full justify-between  ">
        <div className="text-white font-semibold font-sans">My Space</div>
        <input
          className="text-center rounded-xl mb-1 focus:outline-none font-sans font-semibold 2xl:text-lg"
          placeholder="Search..."
        />
      </div>
      <div
        key={"lines"}
        className="w-full border-solid border-gray-300 border-2 "
      />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-2 w-full justify-center sm:justify-between">
      {freetemplateItems.map((item: any, index: any) => {
        return (
            <div key={index}  className="flex flex-col items-center  hover:cursor-pointer"
                onClick={() => {
                    handleClickSpace(index)}}
            >
              <img className="w-[20vw] rounded-xl" src={template} alt="astro" />
              <div className="hidden flex-col pt-5 md:flex">
                <span className="font-sans font-xl text-white">
                  {item.hash}
                </span>
                <span className="font-sans font-xl text-white">
                  00110204334
                </span>
                <span className="font-sans font-xl text-white">
                  Peak Vila, Mount Everest,0011
                </span>
              </div>
            </div>
        );
    })}
    </div>
      <div
        key={"line"}
        className="w-full border-solid border-gray-300 border-2"
      />
    </div>
  );
}
