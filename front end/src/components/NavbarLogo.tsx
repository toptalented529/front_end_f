/**
 * @param {{ logo: string; linkFirst: string; linkMiddle: string; linkLast: string; }} props
 */


import fadaLogo from '../assets/images/fada.svg'

export function NavbarLogo({
  props,
}: {
  props: {
    logo: string;
 
  };
}): JSX.Element {
  return (
    <div className="flex justify-center h-14 w-full text-gray-50 sm:w-1/2 sm:justify-start">
      <img src = {fadaLogo} alt="fada logo"></img>
      <a
        className="no-underline self-center pt-4 text-gray-50 hover:text-gray-50 hover:no-underline"
        href="/"
        target=""
        rel="noreferrer"
      >
        <span className="pr-4 text-xl capitalize hover:animate-pulse font-sans font-bold  ">
          {props.logo}
        </span>
      </a>
    </div>
  );
}
