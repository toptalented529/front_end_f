// import { Item } from "./pages/ItemDetail";

import { useEffect, useState } from "react";
import astro from "../../assets/images/astro.png";
import axios from "axios";

/* main app */

interface UserData  {
    username:string,
    email:string,
    space:string,
    business:string,
    phone:string,
    address:string,
    language:string,
    timezone:string,
    payment:string,
    onboarding_finished:string

}
export default function TopScreen(): JSX.Element {
    const [userData, setUserData] = useState<UserData>();
    useEffect(() => {
      const getInfo = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/v1/users/info",
            {
              headers: {
                authorization: `Bearer ${
                  localStorage.getItem("JWT")
                }`,
              },
            }
          );
          console.log(response.data);
          setUserData({
            username: response.data.username,
            email: response.data.email,
            space: response.data.space,
            business: response.data.business,
            phone: response.data.phone,
            address: response.data.address,
            language: response.data.language,
            timezone: response.data.timezone,
            payment: response.data.response,
            onboarding_finished: response.data.onboarding_finished,
          });
        } catch (e: any) {
          if (e.response.status === 401) {
            try {
              const response = await axios.get(
                "http://localhost:8000/v1/auth/refresh",
                {
                  headers: {
                    "x-refresh-token": `Bearer ${
                      localStorage.getItem("refreshToken")
                    }`,
                  },
                }
              );
  
              if (response.data.token) {
                let token = response.data.token
                if(token?.includes('"')){
                     token = token.split('"')[1]
                }
                localStorage.setItem("JWT", token);
                getInfo()
            }
            } catch (e: any) {
              if (e.response.status === 401) {
                window.location.href = "/signin";
              }
            }
          }
        }
      };
      getInfo();
    }, []);
  
  return (
    <div>

    <div className="flex flex-col h-auto  p-4 w-[80vw] mt-[5vh] ml-[2vw] bg-gradient-to-r from-[#212121] to-[#0a090a] items-start rounded-xl justify-start">
      <div className="flex flex-row  w-full justify-between  ">
        <div className="text-white font-semibold font-sans">{userData?.username}</div>
        <div className="flex flex-row gap-3 2xl:gap-6">
          <div className="text-white font-semibold font-sans">
            Site Language
          </div>
          <div className="text-white font-semibold font-sans">{userData?.language}</div>
        </div>
      </div>
      <div
        key={"line3"}
        className="w-full border-solid border-gray-300 border-2"
      />
      <div className="flex flex-row py-2 w-full justify-between">
        <div className="flex flex-row gap-4">
          <img className="w-[15vh] rounded-xl" src={astro} alt="astro" />
          <div className="flex flex-col pt-5">
            <span className="font-sans font-xl text-white">
                {userData?.email}
            </span>
            <span className="font-sans font-xl text-white">{userData?.phone}</span>
            <span className="font-sans font-xl text-white">
                {userData?.address}
            </span>
          </div>
        </div>

        <div className="flex flex-row gap-8 2xl:gap-6 items-end">
          <div className="text-white font-semibold font-sans">Currency</div>
          <div className="text-white font-semibold font-sans">USD</div>
        </div>
      </div>
      <div
        key={"line"}
        className="w-full border-solid border-gray-300 border-2"
      />
       <div className="flex flex-row gap-8 2xl:gap-6 items-end pl-[17vh] justify-around">
          <div className="text-white font-semibold font-sans">My Plan</div>
          <div className="text-white font-semibold font-sans">FadaPro</div>
        </div>
    </div>
    

    </div>
  );
}
