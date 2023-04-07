import myImage from "../../assets/images/Church_street.png";
import web3Image from "../../assets/images/template.png";

/**
 * @param {{ hText: string; pText: string; bText: string; }} props
 */
export function CreateSpace(): JSX.Element {
  const handleStart = () => {
    window.scroll({
      top: 0, // set the top position of the viewport to the new Y position
      left: 0, // set the left position of the viewport to the new X position
      behavior: "smooth", // animate the scroll
    });
  };
  return (
    <div className="bg-black w-full h-screen flex flex-col justify-between">
      <div className={`relative bg-[#201c1c] items-center flex flex-row justify-between opacity-80`}>
        <div className="relative pl-[7vw] justify-between">
          <div className="flex flex-col justify-center w-[40vw]">
            <span className="text-black font-extrabold text-[20px] pb-[3vh] sm:text-xl lg:text-2xl 2xl:text-4xl font-sans">
              Build your Metaverse space in 5 minutes
            </span>
            <span className="text-black sm:text-sm lg:text-md 2xl:text-2xl font-sans">
              -leverage our no-code toolkit for metaverse building
            </span>
            <span className="text-black sm:text-sm lg:text-md 2xl:text-2xl font-sans">
              -Get a free template to get you started
            </span>
            <span className="text-black sm:text-sm lg:text-md 2xl:text-2xl font-sans">
              -Zero to custom metaverse in 5 minutes, no previous knowledge
              required
            </span>
            <span className="text-black sm:text-sm lg:text-md 2xl:text-2xl font-sans">
              -Create and share your webspace to up your online game
            </span>

            <button
              className="mt-[3vw] text-white font-sans  self-start bg-black px-[3vw] rounded-2xl py-[5px] z-[2]"
              onClick={handleStart}
            >
              Get Started!
            </button>
          </div>
        </div>

        <div className="w-[50vw] h-[50vh] pt-[5vh] z-10">
          <img src={web3Image} alt="church" className=" relative  h-[45vh] w-[50vw]"></img>
        </div>
      </div>
      <div className="flex flex-row pl-[7vw] justify-between">
        <div className="flex flex-col justify-center">
          <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">
            publish your metaverse space and
          </span>
          <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">
            get it ready for Computers, Mobile
          </span>
          <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">
            phones and VR Googgles
          </span>
          <span className="text-white sm:text-sm lg:text-sm 2xl:text-md font-sans mt-[3vw]">
            -instant multi-device integration upon deployment
          </span>

          <button
            className="mt-[3vw] text-black font-sans  self-start bg-white px-[3vw] rounded-2xl py-[5px]"
            onClick={handleStart}
          >
            Get Started!
          </button>
        </div>
        <div className=" w-[50vw] h-[50vh]">
          <img src={myImage} alt="church" className="h-[50vh] w-[50vw]"></img>
        </div>
      </div>
    </div>
  );
}
