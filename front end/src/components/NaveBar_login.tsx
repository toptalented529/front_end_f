
import { NavbarLogo } from "./NavBar/NavbarLogo";

/**
 * @param {{ logo: string; linkFirst: string; linkMiddle: string; linkLast: string; }} props
 */
export function NavBarLogIn(props: {
  logo: string;
}): JSX.Element {
  return (
    <nav className="w-full p-2 mt-0 bg-black">
      <div className="relative flex flex-row  items-center mx-auto justify-between ">
        <NavbarLogo props={props} />
      </div>
    </nav>
  );
}
