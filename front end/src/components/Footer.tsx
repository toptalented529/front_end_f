import { Copyright } from "./Copyright";
import fadaLogo from "../assets/images/fada.svg";
/**
 * @param {{ owner: string; }} props
 */
export function Footer(props: { owner: string }): JSX.Element {
  const url = "https://github.com/fada" as string;
  return (
    <div className="relative bg-black items-start sm:items-center mt-[-12rem] z-999 ">
      <div className="flex flex-row items-start sm:self-center justify-between  pb-6">
        <div className="flex flex-col items-center sm:items-start ">
          <img className="w-48 h-auto" src={fadaLogo} alt=""></img>
          <p className="text-white font-sans  text-xs pl-2">
            Enabling the spatial internet.
          </p>
        </div>
        <div className="flex flex-row mr-[calc(12vw)] gap-10 mt-8">
          <div className="flex flex-col">
            <span className="text-white font-sans text-2xl pb-4 2xl:text-3xl ">Resource</span>
            <span className="text-white font-sans ">Media Kit</span>
            <span className="text-white font-sans ">Tutorial</span>
            <span className="text-white font-sans ">Partner registeration</span>
            <span className="text-white font-sans pb-8 ">The fada community</span>
            <span className="text-white font-sans ">Inverstor Deck</span>
          </div>
          <div className="flex flex-col">
          <span className="text-white font-sans text-2xl pb-4 2xl:text-3xl ">Legal</span>
          <span className="text-white font-sans ">Privacy policy</span>
          <span className="text-white font-sans">Terms of Service</span>
          <span className="text-white font-sans">Cookie Policy</span>

          </div>
          <div className="flex flex-col">
          <span className="text-white font-sans text-2xl pb-4 2xl:text-3xl ">About</span>
          <span className="text-white font-sans ">Fada Wiki</span>
          <span className="text-white font-sans ">Blog</span>
          <span className="text-white  font-sans">features</span>
          <span className="text-white font-sans pb-8 ">Business ecosystem</span>
          <span className="text-white font-sans">Career</span>
          <span className="text-white font-sans">contact</span>
          <span className="text-white font-sans">price</span>

          </div>
          
        </div>
      </div>
      <a href={url} target="_blank" rel="noreferrer">
        <Copyright props={props} />
      </a>
    </div>
  );
}
