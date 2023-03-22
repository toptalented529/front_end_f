import { useState, useEffect } from "react";
import { words } from "../../data";
import moon from "../../assets/images/Moon.svg";
import rocket from "../../assets/images/Rocket.svg";
import axios from "axios";

export default function Setting(props: any): JSX.Element {
  const [space, setSpace] = useState<string>("");
  const [space1, setSpace1] = useState<string>("");
  const [almostReady, setAlmostReady] = useState<boolean>(false);
  const spaceCaption = "What kind of Space are you creating?";
  const caption = "preparing your Fada Dashboard";
  const almostCaption = "your Dashboard is almost ready!";
  const handleClick = async (word: string) => {
    console.log(localStorage.getItem("refreshToken"));
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/auth/set-space",
        {
          space: word,
        },
        {
          headers: {
            authorization: `Bearer ${
              localStorage.getItem("JWT")
            }`,
            "x-refresh-token": `Bearer ${
              localStorage.getItem("refreshToken")
            }`,
          },
        }
      );
      if (response.data.space) {
        setSpace1("filled");
        setTimeout(() => {
          setSpace(word);
          setSpace1("");
        }, 1000);
      }
    } catch(e: any) {
        if(e.response.status === 401){
            try{
            const response = await axios.get(
                "http://localhost:8000/v1/auth/refresh",
                {
                  headers: {
                    "x-refresh-token": `Bearer ${localStorage.getItem("refreshToken")}`
                  },
                }
              );


              if(response.data.token){
                let token = response.data.token
                if(token?.includes('"')){
                     token = token.split('"')[1]
                }
                localStorage.setItem("JWT",token)
              }
              handleClick(word);

              }catch(e:any) {
                if(e.response.status === 401){
                    window.location.href = '/signin'
                }
              }
        }
      
    }
  };

  useEffect(() => {
    const element = document.getElementById("moon-element");
    const element1 = document.getElementById("rocket-element");
    if (element && element1) {
      setTimeout(() => {
        // element.classList.add("translate-x-[calc(-3vw)]");
        element1.classList.add("translate-x-[calc(10vw)]");
        console.log("element", element1);
      }, 1000);

      const handleTransitionEnd = () => {
        setAlmostReady(true);

        props.onData(true);
        console.log("Animation finished!");
      };

      element1?.addEventListener("transitionend", handleTransitionEnd);
      //   element1?.addEventListener("transitionend", handleTransitionEnd);

      // Clean up event listeners
      // element?.removeEventListener("transitionend", handleTransitionEnd);
      // element1?.removeEventListener("transitionend", handleTransitionEnd);
    }

    console.log("element", element1);
  }, [space]);

  return (
    <div
      className={`flex flex-col h-2/5 w-5/6 bg-gray-300 opacity-60  items-center justify-center px-2 rounded-3xl transition-opacity duration-500 ease-in-out ${
        space1 ? "opacity-0" : "opacity-90"
      }`}
    >
      <div
        className={`font-sans font-extrabold mb-12  text-md lg:text-xl xl:text-3xl lg:mb-12 xl:mb-12 transition-opacity duration-500 ease-in-out ${
          space1 ? "opacity-0" : "opacity-100"
        }`}
      >
        {!space ? spaceCaption : almostReady ? caption : almostCaption}
      </div>
      {!space ? (
        <div className="grid w-full grid-cols-4 gap-4 mt-2 text-md lg:text-xl opacity-100 2xl:gap-24 xl:text-2xl ">
          {words.map((word: string, index: any) => {
            return (
              <span
                key={index}
                className={`text-center text-black font-sans font-medium hover:cursor-pointer transition-opacity duration-500 ease-in-out ${
                  space1 ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => {
                  handleClick(word);
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-row h-2/6 justify-center gap-8">
          <img
            src={rocket}
            id="rocket-element"
            className="transform translate-x-0 transition ease-in duration-500"
            alt="rocket"
          />
          <img
            src={moon}
            id="moon-element"
            className="transform translate-x-0 transition ease-in delay-100 duration-500"
            alt="moon"
          />
        </div>
      )}
    </div>
  );
}
