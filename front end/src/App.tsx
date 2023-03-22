import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { Item } from "./pages/ItemDetail";
import { PublishItem } from "./pages/PublishItem";
import { Experience } from "./pages/Experience";
import Sign from "./pages/Sigin";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/Verify_email";
import Onbording from "./pages/Onboarding";
import OnboardingSetting from "./components/Onboarding/Onboarding_setting";
import DashBoard from "./pages/Dashboard";
/* main app */
export default function App(): JSX.Element {
  const hostname = window.location.hostname;
  let subdomain = "";
  if (hostname.split(".")[0] === "fada") {
    subdomain = "";
  } else {
    subdomain = hostname.split(".")[0];
  }
  console.log(subdomain);

  return (
    <Router>
      <div>
        <Routes>
          {subdomain && <Route path="/" element={<Home />}></Route>}

          <Route path="/item/:id" element={<Item />}></Route>
          {subdomain && (
            <Route path="/:projectname" element={<PublishItem />}></Route>
          )}

          <Route path = "experiences/:id" element= {<Experience />}></Route>
          <Route path = "signIn" element= {<Sign />}></Route>
          <Route path = "signUp" element= {<SignUp />}></Route>
          <Route path = "verify-email" element= {<VerifyEmail />}></Route>
          <Route path = "onboarding" element= {<Onbording />}></Route>
          <Route path = "onboarding-setting" element= {<OnboardingSetting />}></Route>
          <Route path = "dashboard" element= {<DashBoard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
