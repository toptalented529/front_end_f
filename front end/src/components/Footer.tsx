import { Copyright } from "./Copyright";
import fadaLogo from "../assets/images/fada.svg";
/**
 * @param {{ owner: string; }} props
 */
export function Footer(props: { owner: string }): JSX.Element {
  const url = "https://github.com/fada" as string;
  return (
    <div className="relative bg-black items-start sm:items-center mt-[-12rem] z-999 ">
      <div className=" items-start sm:self-center  pb-6">
        <div className="flex flex-col items-center sm:items-start ">
          <img className="w-48 h-auto" src={fadaLogo} alt=""></img>
          <p className="text-white font-sans  text-xs pl-2">
            Enabling the spatial internet.
          </p>
        </div>
      </div>
      <a href={url} target="_blank" rel="noreferrer">
        <Copyright props={props} />
      </a>
    </div>
  );
}
