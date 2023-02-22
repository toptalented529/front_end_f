import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'

import Home from "./pages/Home";
import { Item } from "./pages/ItemDetail";
import { PublishItem } from './pages/PublishItem';
/* main app */
export default function App(): JSX.Element {

  const hostname = window.location.hostname;
  let subdomain = ''
  if(hostname.split('.')[0] === "fada" ){
    subdomain = ""
  }
   subdomain = hostname.split('.')[0]


  return (
    <Router>
    <div >
        <Routes>
        <Route  path = "/" element={<Home />} ></Route>
        
        <Route  path = "/item/:id" element={<Item />} ></Route>
        {
       subdomain && <Route path = "/:projectname" element = {<PublishItem />}></Route>
      }
     
     </Routes>
    </div>
    </Router>
  );
}
