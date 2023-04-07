import { GenerateNavbarLinks } from "./GenerateNavbarLinks";

/**
 * @param {{ logo: string; linkFirst: string; linkMiddle: string; linkLast: string; }} props
 */
export function NavbarLinks(): JSX.Element {
  const navbarLinksData = [
    { href: "/item",linkText:'Gallery'},
    { href: "/",linkText: 'Plans' },
    { href: "/",linkText: 'Fada Docs'},
    { href: "#",  linkText:'Contact Us'},
  ];

  return (
    <div className="content-center w-auto pt-4 capitalize sm:w-auto sm:justify-end hidden md:flex">
      <ul className="flex items-center justify-center flex-1 list-reset sm:flex-none">
        {GenerateNavbarLinks({ navbarLinksData })}
      </ul>
    </div>
  );
}
