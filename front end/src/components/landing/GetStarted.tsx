import image from '../../assets/images/Church_street.png'


/**
 * @param {{ hText: string; pText: string; bText: string; }} props
 */
export function GetStarted(): JSX.Element {
 
    const handleStart = () => {
        window.scroll({
            top: 0, // set the top position of the viewport to the new Y position
            left: 0, // set the left position of the viewport to the new X position
            behavior: 'smooth' // animate the scroll
          });
    }
  return (
    <div className="bg-black w-full h-screen flex flex-col justify-between">
        <div className="items-center self-center flex flex-col mt-[15vh]">
            <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">Fada is the first metaverse platform in Arabic,</span>
            <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">enabling the spatial internet</span>
            <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">by empowering everyone to build their web3 presence using zero-code</span>
        </div >
        <div className="flex flex-row pl-[7vw] justify-between">
            <div className="flex flex-col justify-center">
                <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">publish your metaverse space and</span>
                <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">get it ready for Computers, Mobile</span>
                <span className="text-white sm:text-md lg:text-xl 2xl:text-2xl font-sans">phones and VR Googgles</span>
                <span className="text-white sm:text-sm lg:text-sm 2xl:text-md font-sans mt-[3vw]">-instant multi-device integration upon deployment</span>

                <button className='mt-[3vw] text-black font-sans  self-start bg-white px-[3vw] rounded-2xl py-[5px]'
                 onClick={handleStart}
                 >Get Started!</button>
            </div>
            <div className=' w-[50vw]'>
                <img src ={image} alt="church"></img>
            </div>
        </div>

    </div>


  );
}
