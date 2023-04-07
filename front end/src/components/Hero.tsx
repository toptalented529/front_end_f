// import { HeroImage } from "./HeroImage";
import { useNavigate } from "react-router-dom";
import fadaLogo from "../assets/images/image.png";
// import { NavbarLinks } from "./NavBar/NavbarLinks";
/**
 * @param {{ hText: string; pText: string; bText: string; }} props
 */
export function Hero(): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    // <div className="flex flex-col justify-start items-center mx-auto mb-12 sm:flex-row sm:mb-24">
    <div className=" relative flex flex-col items-center justify-center w-full px-6 pt-0 pb-24 lg:w-full text-gray-50 h-screen">
      <img className="h-1/5" src={fadaLogo} alt=""></img>
      <p className="leading-normal text-center text-white text-2xl font-sans font-bold sm:mx-auto ">
        Arabic For Space
      </p>
      <p className="my-4 leading-normal font-sans text-center text-gray-200 text-2xl sm:mx-auto">
        Enabling the spatial Internet
      </p>
      <div className="flex flex-row">
        <button
          type="button"
          className="px-12 mr-4 font-bold font-sans py-2 mx-auto my-4 capitalize bg-gray-50 border border-gray-900 shadow hover:animate-pulse hover:bg-blue-900 text-black hover:text-gray-50 rounded-full hover:shadow-lg hover:border-transparent"
          onClick={handleClick}
        >
          Build Metaverse
        </button>
        <button
          type="button"
          className="px-12 font-bold font-sans py-2 sm:px-20 mx-auto my-4 capitalize bg-gray-50 border border-gray-900 shadow hover:animate-pulse hover:bg-blue-900 text-black hover:text-gray-50 rounded-full hover:shadow-lg hover:border-transparent"
        >
          <a href="mailto:work.katashi@gmail.com">Hire us</a>
        </button>
      </div>
      <div className="absolute bottom-0">

      </div>
    </div>
    //  </div>
  );
}
