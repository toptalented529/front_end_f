// import { links } from "../data";
// import { Quote } from "../components/Quote";
import { text } from "../data";
import { NavBarLogIn } from "../components/NaveBar_login";
import { SignUps } from "../components/Signup/Sign_Up";

// import { Item } from "./pages/ItemDetail";
/* main app */
export default function SignUp(): JSX.Element {
  return (
    <div className=" bg-black ">
      <NavBarLogIn logo={text[3]} />
      <SignUps />
      

    </div>
  );
}
