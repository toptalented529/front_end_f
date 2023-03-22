// import { HeroImage } from "./HeroImage";
// import { useNavigate } from "react-router-dom";
/**
 * @param {{ hText: string; pText: string; bText: string; }} props
 */

import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export function SignIn(): JSX.Element {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [credentialError,setCredentialError] = useState<boolean>(false)


  const navigate = useNavigate()

  const { handleGoogleSign, loading } = useFetch(
    "http://localhost:8000/v1/auth/signupWithGoogle"
  );


  const checkEmailFormat = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleEmailFormat = (email:string) => {
    
    if(checkEmailFormat(email)){

      let [localPart, domain] = email.split('@');
      let newLocalPart = localPart.replace(/\./g, '');
      let newEmail = newLocalPart + '@' + domain;
      return newEmail;
    }else{
      return null;
    }
    
  }

  useEffect(() => {
    /* global google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSign,
      });
      window.google.accounts.id.renderButton(document.getElementById("SignUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        size: "large",
        text: "signin_with",
        shape: "pill",
        customColor: "#FF0000"
      });

    // const container = document.getElementById("SignUpDiv");
    // container?.style.fontSize = "24px"; // Increase font size
    // container?.style.padding = "24px"; // Increase paddin
      // window.google.accounts.id.prompt()
      console.log(handleGoogleSign)
    }
  }, [handleGoogleSign]);

  const handleMetamask = () => {

  }

 

  const handleGoogle = async () => {
    try{

      const emailAddress = handleEmailFormat(email)
      if(emailAddress ===null){
        notification.open({
          message:"SignIn",
          description:"Email format is not correct!",
          type:"warning",
          duration:3,
        })
        return
      }
      const response = await axios.post("http://127.0.0.1:8000/v1/auth/signin",{
        email:emailAddress,
        password:password
      })
 
      if(response.data.token){
        let token = response.data.token
        if(token?.includes('"')){
             token = token.split('"')[1]
        }
        let refreshToken = response.data.refreshToken
        if(refreshToken?.includes('"')){
          refreshToken = refreshToken.split('"')[1]
        }
        
      localStorage.setItem("JWT",token)
      localStorage.setItem("refreshToken",refreshToken)
       window.location.href = '/dashboard'
       console.log(response.data.token)
      }else{

        notification.open({
          message:"Credential!",
          description:"Credentials incorrect!",
          type:"info",
          duration:3,
        })
      //  alert("credentials incorrect!")
       setCredentialError(true)
      }

    } catch(e:any){
      console.log(e.response.status)
      if(e.response.status ===400){
        notification.open({
          message:"Credential!",
          description:"Credentials incorrect!",
          type:"info",
          duration:3,
        })
        setCredentialError(true)

      }
    }
   

 

}
  return (
    // <div className="flex flex-col justify-start items-center mx-auto mb-12 sm:flex-row sm:mb-24">
    <div className=" relative flex flex-col items-center justify-center w-full px-6 pt-0 pb-24 lg:w-full text-gray-50 h-screen">
      <button className="bg-white font-bold font-sans text-black px-6 py-2 rounded-2xl mb-6"
        onClick={() => {
          navigate('/signup')
        }}
      >
        Sign In/Sign Up
      </button>
      <input
      className="py-2 px-12 text-black font-sans font-bold rounded-2xl mb-4 w-[300px] sm:w-[400px]  text-center"
      placeholder="Email"
      onChange={(e) =>{
        setEmail(e.target.value)
      }}

      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // Enter key was pressed
          handleGoogle();
        }
      }}
      />
      <input
      className="py-2 px-12 text-black font-sans font-bold rounded-2xl  w-[300px] sm:w-[400px] text-center mb-8"
      placeholder="Password"
      type = "password"
      onChange={(e) =>{
        setPassword(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          // Enter key was pressed
          handleGoogle();
        }
      }}
      />{
        credentialError &&
      <span className="underline-offset-1 text-white">don't you have credential? go to signUp</span>
      }
      <div className="flex flex-row items-center mb-8">
        <div className="bg-white h-[2px]  w-[125px] sm:w-[175px] mr-3" />
        <span>Or</span>
        <div className="bg-white h-[2px]  w-[125px] sm:w-[175px] ml-3" />

        <div />
      </div>
    <button className="bg-[#3D5AA8] py-2 px-24 font-sans  w-[300px] sm:w-[400px] rounded-2xl mb-6 hover:animate-pulse hover:bg-blue-900  hover:text-gray-50 hover:shadow-lg hover:border-transparent" onClick={handleMetamask} >Metamask</button>
    <button className="bg-[#D01F25] py-2 px-32 font-sans  w-[300px] sm:w-[400px] rounded-2xl hover:animate-pulse hover:bg-[#D01F25]  hover:text-gray-50 hover:shadow-lg hover:border-transparent " onClick={handleGoogle}>SignIn</button>
    {loading ? <div>loading</div> : <button className=" mt-4" id="SignUpDiv"></button>}

    </div>
  );
}
