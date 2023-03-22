// import React from "react";
/**
 * @param {{ itemNumber: number; }} props
 */
import React,{ useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";



export const  PublishItem:React.FC = () => {

//   const url = "https://novdyn.gmetri.com/the_cozy_den_3" as string;
  const [loading,setLoading] = useState<boolean>(true)
  const [iframe_url, setIframe_url] = useState<string>('')



  const {hostname,pathname} = window.location
  // const subdomain = hostname.split('.')[0]
  

  const { projectname } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =await axios.get("http://127.0.0.1:8000/v1/upload/getpublished",{
                 params : { 
                  /////////////save this format sub.fada.xyz/projectname////////////
                    hostname: hostname+pathname
                        }
                   }
                )
                const item = response.data.project
                console.log(item,"this is api call")
                setIframe_url(item)
                setLoading(false)
               }catch(error){
                   console.log(error)
               }
        }
        fetchData()
    },[projectname])
  return (<div className="h-screen">
  {
    loading? <div className="bg-gray-800 h-scren"></div>:
  
    <div className="bg-gray-600   m-0 mx-0  flex flex-col items-center w-full h-screen">
   
        <iframe 
            src = {iframe_url}
            width={"100%"}
            height={"100%"} 
            tabIndex={-1}
            title ={"title"}
            >

    </iframe>
 
    </div>
    }
    </div>
  );
}
