// import React from "react";
/**
 * @param {{ itemNumber: number; }} props
 */
import React,{ useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import {UploadContainer}  from "./uploadContainer";
// import { items } from "../data";
import { GoLiveContent } from "../components/GoLiveTab";
import axios from "axios";



export const  Item:React.FC = () => {

//   const url = "https://novdyn.gmetri.com/the_cozy_den_3" as string;
  const [uploadView, setuploadView] = useState<boolean>(false)
  const [goTabView, setGoTabView] = useState<boolean>(false)
  const [items,setItems] = useState<any>(null)
  const [loading,setLoading] = useState<boolean>(true)
  const [message,setMessage] = useState<string>('')
  const [count,setCount] = useState<number>(0)
  const [iframe_url, setIframe_url] = useState<string>('')

  const handleMessage = (newMessage:string) => {
    setMessage(newMessage)
    setCount(count+1)
  }

  useEffect(() => {
    if(message === "Refresh"){
        setIframe_url(iframe_url+`?d=${Date.now()}`)
    }

    setMessage('')
  }, [count,iframe_url,message])

  const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =await axios.get("http://127.0.0.1:8000/v1/upload/items")
                const item = response.data.items
                console.log(item,"this is api call")
                setItems(item)
                setIframe_url(item[Number(id)].urls)
                window.localStorage.setItem("projectURL",item[Number(id)].urls)
                setLoading(false)
               }catch(error){
                   console.log(error)
               }
        }
        fetchData()
    },[id])
  return (<div className="">
  {
    loading? <div className="bg-gray-800 h-scren"></div>:
  
    <div className="bg-gray-600   m-0 mx-0  flex flex-col items-center w-screen h-screen">
    <button className="bg-slate-800 absolute top-8 left-3 text-white font-bold rounded-md px-4 py -2"
        onClick={() => {setuploadView(!uploadView)}}> upload content</button>
        {
        
        uploadView && <UploadContainer imageNumber ={items[Number(id)].imageId} itemNumber={Number(id)} onMessageChanges={handleMessage}  />      
        }
    <button className="bg-slate-800 absolute top-8 left-[45%] text-white font-bold rounded-md px-4 py -2"
       ><a href="/"> Back to DashBoard</a></button>
    <button className="bg-slate-800 absolute top-8 right-32  text-white font-bold rounded-md px-4 py -2"
        onClick={() => {
            setGoTabView(!goTabView)
        }
            }>Go Live</button>
        {
            goTabView && <GoLiveContent/>
        }

        <iframe 
          className="h-[100vh] w-[100vw]"
            src = {iframe_url}
          
            tabIndex={-1}
            title ={"title"}
            >

    </iframe>
 
    </div>
    }
    </div>
  );
}
