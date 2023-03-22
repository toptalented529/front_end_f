// import { Item } from "./pages/ItemDetail";

import axios from "axios";
import { useNavigate } from "react-router-dom";

/* main app */
export default function SideMenu(): JSX.Element {

    const navigate = useNavigate()
  return (
    <div className="hidden flex-col h-[80vh] w-[10vw] mt-[5vh] ml-[2vw] bg-gradient-to-r from-[#212121] to-[#0a090a] justify-center items-center md:flex md:justify-between rounded-xl">
      <button className="bg-gray-200 w-full rounded-2xl font-sans text-sm 2xl:h-11 2xl:text-lg font-semibold p-1 m-1"
        onClick={() => {
            navigate('/')
        }}
        >
        Home
      </button>
      <button className="bg-gray-200 w-full rounded-2xl mt-[-4vh] font-sans 2xl:h-11 text-sm 2xl:text-lg font-semibold p-1 m-1">
        Global Position
      </button>
      <button className="bg-gray-200 w-full rounded-2xl mt-[-4vh] font-sans text-sm 2xl:h-11 2xl:text-lg font-semibold p-1 m-1">
        Analytics
      </button>
      <div className=" flex w-4/5 h-[8vw] mt-[3vh] rounded-full bg-gradient-to-r from-white to-green-400 items-center justify-center">
        <div className="w-3/4 h-[6vw] items-center  justify-center bg-gradient-to-r from-[#212121] to-[#0a090a] rounded-full"></div>
      </div>
      <button className="bg-gray-200 w-full rounded-2xl font-sans 2xl:h-11 2xl:text-lg text-sm font-semibold p-1 m-1">
        Analytics
      </button>
      <button className="bg-gray-200 w-full rounded-2xl font-sans mt-[-4vh] 2xl:h-11 2xl:text-lg text-sm font-semibold p-1 m-1">
        Settings
      </button>
      <button className="bg-gray-200 w-full rounded-2xl font-sans text-sm  2xl:h-11 2xl:text-lg font-semibold p-1 m-1">
        Forum
      </button>
      <button className="bg-gray-200 w-full rounded-2xl mt-[-4vh] font-sans 2xl:h-11 2xl:text-lg text-sm font-semibold p-1 m-1"
        onClick={() => {
            window.location.href = 'https://discord.com';
        }}
      >
        Discord
      </button>
      <button className="bg-gray-200 w-full rounded-2xl font-sans text-sm 2xl:h-11 2xl:text-lg font-semibold p-1 m-1"
        onClick={async ()  => {
            // localStorage.removeItem("JWT");
            // localStorage.removeItem("refreshToken");
            const response = await axios.get('http://127.0.0.1:8000/v1/auth/logout',{
                headers: {
                    "x-refresh-token": `Bearer ${localStorage.getItem("refreshToken")}`
                }
            }) 
            console.log(response)
            navigate("/")
        }}
      >
        Logout
      </button>
    </div>
  );
}
