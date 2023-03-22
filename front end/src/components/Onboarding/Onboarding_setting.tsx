import { useState, useEffect } from "react";
import { timezone } from "../../data";
import { paymentMethod } from "../../data";
import axios from "axios";

export default function OnboardingSetting(): JSX.Element {
  const [space, setSpace] = useState<string>("");
  const [space1, setSpace1] = useState<string>("");
  const [settingConfirmed, setSettingConfirmed] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);
  const [information, setInformation] = useState<boolean>(false);
  const [business, setBusiness] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lang, setLang] = useState<string>("EN-AR");
  const [time, setTime] = useState<string>(timezone[2]);
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [paymentmethod, setPaymentmethod] = useState<string>(paymentMethod[0]);
  const spaceCaption = "Your business name";
  const informationCaption = "Your Bisiness Information";
  const settings = "Your Fada Settings";
  const paymentTitle = "Online Payments";
  //////////////////////////save business name in the back end and forward to other part//////////////////
  const handleClick = async (word: string) => {
    const response = await axios.post(
      "http://localhost:8000/v1/auth/set-business",
      {
        business: word,
      },
      {
        headers: {
          // "authorization": `Bearer ${localStorage.getItem("JWT")}`,
          "x-refresh-token": `Bearer ${
            localStorage.getItem("refreshToken")
          }`,
        },
      }
    );
    if (response.data.business) {
      console.log(word);
      setSpace1("filled");
      setTimeout(() => {
        setSpace(word);
        setSpace1("");
      }, 1000);
    }
  };

  const handleInformation = async () => {
    console.log(email, phone, address, information);

    const response = await axios.post(
      "http://localhost:8000/v1/auth/set-address",
      {
        email: email,
        phone: phone,
        address:address
      },
      {
        headers: {
          // "authorization": `Bearer ${localStorage.getItem("JWT")}`,
          "x-refresh-token": `Bearer ${
            localStorage.getItem("refreshToken")
          }`,
        },
      }
    );
    if (response.data.address) {
    setSpace1("filled");
    setTimeout(() => {
      setInformation(true);
      setSpace1("");
    }, 1000);
  }
  };

  const handleLanguage = () => {
    if (lang === "AR-EN") {
      setLang("EN-AR");
    } else {
      setLang("AR-EN");
    }
  };

  const handleTimeZone = () => {
    const index = timezone.indexOf(time);
    if (index < 11) {
      setTime(timezone[index + 1]);
    } else {
      setTime(timezone[0]);
    }
  };

  const handleSetting = async () => {
    /////////////////////api calling for lang and timezone////////////////////////////////////

    const response = await axios.post(
      "http://localhost:8000/v1/auth/set-timezone",
      {
        language: lang,
        timezone: time,
      },
      {
        headers: {
          // "authorization": `Bearer ${localStorage.getItem("JWT")}`,
          "x-refresh-token": `Bearer ${
            localStorage.getItem("refreshToken")
          }`,
        },
      }
    );
    if (response.data.timezone) {
      setSpace1("filled");
      setTimeout(() => {
        setSettingConfirmed(true);
        setSpace1("");
      }, 1000);
    }
  };

  const handlePayment = async (payment: string) => {
    const response = await axios.post(
      "http://localhost:8000/v1/auth/set-payment",
      {
        payment: payment,
      },
      {
        headers: {
          // "authorization": `Bearer ${localStorage.getItem("JWT")}`,
          "x-refresh-token": `Bearer ${
            localStorage.getItem("refreshToken")
          }`,
        },
      }
    );
    if (response.data.payment) {
      setSpace1("filled");
      setTimeout(() => {
        setPaymentConfirmed(true);
        setSpace1("");
      }, 1000);
      setPaymentmethod(payment);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  useEffect(() => {
    const element = document.getElementById("moon-element");
    const element1 = document.getElementById("rocket-element");
    if (element && element1) {
      setTimeout(() => {
        element.classList.add("translate-x-[calc(-3vw)]");
        element1.classList.add("translate-x-[calc(3vw)]");
        console.log("element", element1);
      }, 1000);

      const handleTransitionEnd = () => {
        console.log("Animation finished!");
      };

      element?.addEventListener("transitionend", handleTransitionEnd);
      //   element1?.addEventListener("transitionend", handleTransitionEnd);

      // Clean up event listeners
      // element?.removeEventListener("transitionend", handleTransitionEnd);
      // element1?.removeEventListener("transitionend", handleTransitionEnd);
    }

    console.log("element", element1);
  }, [space]);

  return (
    <div
      className={`flex flex-col h-auto w-5/6 bg-gray-300 opacity-60  items-center justify-center px-2 rounded-3xl transition-opacity duration-500 ease-in-out ${
        space1 ? "opacity-0" : "opacity-90"
      }`}
    >
      <div
        className={`font-sans font-extrabold pt-[calc(5vh)] pb-2 text-md lg:text-xl xl:text-3xl lg:mb-12 xl:mb-12 transition-opacity duration-500 ease-in-out ${
          space1 ? "opacity-0" : "opacity-90"
        }`}
      >
        {!space
          ? spaceCaption
          : !information
          ? informationCaption
          : settingConfirmed
          ? paymentTitle
          : settings}
      </div>
      {!space ? (
        <div className="flex flex-col w-full  pb-[calc(8vh)] justify-center items-center mt-2 text-md lg:text-xl opacity-100 2xl:gap-24 xl:text-2xl ">
          <div className="font-semibold pb-[calc(3vh)]">
            What's the name of your business?
          </div>
          <input
            key={1}
            className="bg-transparent w-1/2 font-semibold  mb-[calc(3vh)] focus:outline-none border-b-[1px] border-black text-center"
            onChange={(e) => {
              setBusiness(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick(business);
              }
            }}
          />

          <div className="font-sans font-bold text-sm text-center">
            you can edit anydefault at anytime in your Dashboard
          </div>
        </div>
      ) : !information ? (
        <div className="flex flex-col w-full  gap-4 pb-[calc(1vh)] justify-center items-center mt-2 text-md lg:text-xl opacity-100 2xl:gap-24 xl:text-2xl ">
          <input
            key={2}
            className="bg-transparent w-1/2 py-3 font-semibold font-sans text-lg placeholder:text-black placeholder:font-semibold focus:outline-none border-b-[1px] border-black text-center"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
          <input
            key={3}
            className="bg-transparent w-1/2 py-3 font-semibold font-sans text-lg placeholder:text-black placeholder:font-semibold focus:outline-none border-b-[1px] border-black text-center"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="Phone Number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <input
            key={4}
            className="bg-transparent w-1/2 py-3 font-semibold font-sans text-lg placeholder:text-black placeholder:font-semibold placeholder:text-lg focus:outline-none border-b-[1px] border-black text-center"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInformation();
              }
            }}
            placeholder="Address"
          />

          <div className="font-sans font-bold text-sm text-center">
            you can edit any default at anytime in your Dashboard
          </div>
        </div>
      ) : !settingConfirmed ? (
        <div className="flex flex-col w-full  gap-4 pb-[calc(1vh)] justify-center items-center mt-2 text-md lg:text-xl opacity-100 2xl:gap-24 xl:text-2xl ">
          <div className="font-sans text-center">
            Confirm your language and timezone of your space
          </div>
          <div className="grid grid-cols-2 gap-[calc(20vw)]">
            <button
              className="font-semibold font-sans hover:cursor-pointer "
              onClick={handleLanguage}
            >
              {lang}{" "}
            </button>
            <button
              className="font-semibold font-sans hover:cursor-pointer "
              onClick={handleTimeZone}
            >
              {time}{" "}
            </button>
          </div>
          <button
            className="border-solid border-black border mt-2 px-3 py-1 font-semibold text-lg rounded-2xl"
            onClick={handleSetting}
          >
            confirm
          </button>
          <div className="font-sans font-bold text-sm text-center">
            you can edit any default at anytime in your Dashboard
          </div>
        </div>
      ) : !paymentConfirmed ? (
        <div className="flex flex-col w-full  gap-4 pb-[calc(1vh)] justify-center items-center mt-2 text-md lg:text-xl opacity-100 2xl:gap-24 xl:text-2xl ">
          <div className="font-sans text-center">
            Confirm your language and timezone of your space
          </div>
          <div className="grid grid-cols-2 gap-[calc(20vw)]">
            <button
              className="font-semibold font-sans hover:cursor-pointer "
              onClick={() => {
                handlePayment("MasterCard");
              }}
            >
              {paymentmethod}{" "}
            </button>
            <button
              className="font-semibold font-sans hover:cursor-pointer "
              onClick={() => {
                handlePayment("AED");
              }}
            >
              {"AED"}
            </button>
          </div>
          {/* <button
            className="border-solid border-black border mt-2 px-3 py-1 font-semibold text-lg rounded-2xl"
            onClick={handleSetting}
          >
            confirm
          </button> */}
          <div className="font-sans font-bold text-sm text-center">
            you can edit any default at anytime in your Dashboard
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full  gap-4 pb-[calc(5vh)] justify-center items-center mt-2 text-md lg:text-xl opacity-100 2xl:gap-24 xl:text-2xl ">
          Hooray!You've completed your quick setup!
        </div>
      )}
    </div>
  );
}
