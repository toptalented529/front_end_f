/**
 * @param {{ h2: string; p: string; button: string; }} props
 *
 */

import axios from "axios";
import { useRef, useState } from "react";
import gridImage from "../assets/images/grid1.png"
interface props {
  h2: string;
  p: string;
  button: string;
}

export const Contact: React.FC<props> = (props: {
  h2: string;
  p: string;
  button: string;
}) => {
  console.log(props.p);

  const [emailAddress, setEmailAddress] = useState<string>("");
  const myElementRef = useRef(null)

  const handleEmailSend = async () => {
    const response = await axios.post(
      "http://127.0.0.1:8000/v1/upload/send-email",
      {
        to: "work.katashi@gmail.com",
        subject: "Subscribe from fada",
        body: `subscribe arrived from ${emailAddress}`,
      }
    );
    console.log("result", response);
  };
  return (

    <div className="relative z">
      <img src = {gridImage}
        className="absolute opacity-10 h-[100%] w-[100%]" alt= "pic"
      ></img>
    <div
      className="flex flex-col top-0 left-0 w-full  min-h-screen mb--64 p-12 bg-cover text-sm text-center   
        sm:text-base justify-center text-gray-50 "
      style={{
        backgroundImage: `url(${require("../assets/images/contact.png")})`,
      }}
    >


      <h2 className="mb-4 mt-[-15%] font-bold text-3xl capitalize">
        Join the party!
      </h2>
      {/* <p>{props.p}</p> */}
      <div className="items-center flex flex-col">
        <div ref = {myElementRef} className="relative self-center">
          <input
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
            className="w-[30vw] min-w-[150px] rounded-full bg-black text-white border-b-2 border-blue-500 outline-none font-sans text-lg sm:text-sm lg:text-2xl  h-[4vw] min-h-[50px] placeholder-gray-300 text-center"
            placeholder="Your Email here"
          ></input>
          <div id='#contact' className="absolute top-[80%] w-[80%] left-[10%] h-[1px] bg-white transform scale-x-1 transition-transform"></div>
        </div>
        <button
          onClick={handleEmailSend}
          className="bg-gray-200 font-sans text-lg lg:text-2xl rounded-full font-black
              px-6 mt-6 text-black"
        >
          Subscribe
        </button>
      </div>
    </div>


    </div>
  );
};
