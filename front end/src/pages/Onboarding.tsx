import { useState } from "react";
import churchStreet from "../assets/images/Church_street.png";
import OnboardingSetting from "../components/Onboarding/Onboarding_setting";
import Setting from "../components/Onboarding/setting";

export default function Onbording(): JSX.Element {
  const [setting, setSetting] = useState<boolean>(false);

  const handleData = (data: boolean) => {
    setTimeout(() => {
        
        setSetting(data) ;
    }, 1000);
  };

  return (
    <div
      className="flex h-screen w-full justify-center items-center"
      style={{ backgroundImage: `url(${churchStreet})` }}
    >
      {!setting ? <Setting onData = {handleData} /> : <OnboardingSetting />}
    </div>
  );
}
