import { useState } from "react";
import {CopyOutlined} from "@ant-design/icons"
import axios from "axios";

 export const GoLiveContent: React.FC = () => {
  
  const [linkValue, setLinkValue] = useState<string>("https://novdyn.gmetri.com/the_cozy_den_3")
  const {hostname,pathname} = window.location

   const handlePublish = async () => {
      const response = await  axios.post("http://127.0.0.1:8000/v1/upload/setPublish",{
        projectName: "user.fada.xyz/the_cozy_den_3",
        publishURL: window.localStorage.getItem("projectURL")
      })
      console.log(hostname+ pathname,response)
      if(response.data.res !== undefined && response.data.res !== null){
      window.alert("successfully published")
      }else{
        window.alert("can't publish properly")

      }

   }

    return (
    <div>
      <div className="bg-white bg-opacity-75 absolute top-20 right-32 flex flex-col w-4/12 h-5/6 rounded">
       <div className="flex flex-col mt-10 ml-4">
       <button onClick={handlePublish} className="h-10 px-5  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 w-fit">
            go Public!
        </button>
        <p>This will post your space in the Fada Gallery!
            Share with the world in one click
        </p>
       </div>

       <div className="flex flex-col mt-10 ml-4">
       <button className="h-10 px-5 mb-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 w-fit">
            Link
        </button>
        <div className="flex flex-row">
        <input className="w-10/12 rounded-xl bg-white p-2" 
        value ={"http://user.fada.xyz/the_cozy_den_3"}
        disabled ={true}
        onChange={(e) => {
            setLinkValue(e.target.value)
        }}
        />
        <button className="ml-2" onClick={() => {
            navigator.clipboard.writeText(linkValue)
        }}><CopyOutlined /></button>
        </div>
       </div>

       <div className="flex flex-col mt-10 ml-4">
       <button className="h-10 px-5 mb-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 w-fit">
            Email
        </button>
       <input className="w-10/12 mb-2 rounded-xl  p-2"/>
       <input className="w-10/12 rounded-xl  p-2"/>
       </div>

       <div className="flex flex-col mt-5 ml-4">
       <button className="h-10 px-5 mb-2  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 w-fit">
            Embed
        </button>
        <input className="w-10/12 rounded-xl bg-white p-2" 
        value ={"http://user.fada.xyz/the_cozy_den_3"}
        disabled ={true}/>      
         </div>
        
      </div>
    </div>
  );
};
