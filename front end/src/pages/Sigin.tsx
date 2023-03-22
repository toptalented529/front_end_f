// import { links } from "../data";
// import { Quote } from "../components/Quote";
import { text } from "../data";
import { NavBarLogIn } from "../components/NaveBar_login";
import { SignIn } from "../components/Signin/Signin";
// import { Item } from "./pages/ItemDetail";
/* main app */
export default function Sign(): JSX.Element {
  return (
    <div className=" bg-black ">
      <NavBarLogIn logo={text[3]} />
      <SignIn />
    

    </div>
  );
}
