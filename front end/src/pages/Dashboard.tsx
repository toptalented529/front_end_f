import BottomScreen from "../components/Dashboard/BottomScreen";
import SideMenu from "../components/Dashboard/SideMenu";
import TopScreen from "../components/Dashboard/topScreen";
import { NavBar } from "../components/NavBar/NavBar";
import { text } from "../data";
// import { Item } from "./pages/ItemDetail";
/* main app */

export default function DashBoard(): JSX.Element {
 
  return (
    <div className="flex flex-col h-screen w-full bg-black ">
      <NavBar logo={text[3]} />
      <div className="flex flex-row overflow-auto justify-center ">
        <SideMenu />
        <div className="overflow-y-auto hide-scrollbar">
          <TopScreen />
          <BottomScreen />
        </div>
      </div>
    </div>
  );
}
