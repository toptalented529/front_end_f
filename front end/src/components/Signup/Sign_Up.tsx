// import { HeroImage } from "./HeroImage";
// import { useNavigate } from "react-router-dom";
/**
 * @param {{ hText: string; pText: string; bText: string; }} props
 */
import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";
import axios from "axios";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";



export function SignUps(): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");


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

  const handleSignUp = async () => {
    console.log(isValid, password);
    if (password !== confirmPassword) {
      notification.open({
        message:"password!",
        description:"Confirm Password is not correct!",
        type:"info",
        duration:3,
      })      
      return
    }
    if (!isValid) {
      notification.open({
        message:"password!",
        description:"should imply Upper letter lower letter special letter and at least 8 charactors",
        type:"info",
        duration:3,
      })  
   
      return
    }
    try{
      const emailaddress =  handleEmailFormat(email)
      if(emailaddress ===null) {
        notification.open({
        message:"Credential!",
        description:"email format is not correct!",
        type:"info",
        duration:3,
      }) 
      
        return
      }

      const response = await axios.post("http://127.0.0.1:8000/v1/auth/signup", {
        username: username,
        email: handleEmailFormat(email),
        password: password,
      });
      console.log(response.data.success);
      if (response.data.success) {
        let token = response.data.jwt.token
        if(token?.includes('"')){
             token = token.split('"')[1]
        }
        let refreshToken = response.data.jwt.refreshToken
        if(refreshToken?.includes('"')){
          refreshToken = refreshToken.split('"')[1]
        }

        localStorage.setItem("JWT",token);
        localStorage.setItem("refreshToken", refreshToken);
        notification.open({
          message:"verification code!",
          description:"verification code was sent to email to your email",
          type:"success",
          duration:3,
        })
      } else {
        notification.open({
          message:"SignUp",
          description:"user exists already",
          type:"info",
          duration:3,
        })
      }
    }catch(e:any) {
      console.log(e.response.status)
    }
  };
  const checkPasswordStrenth = (password: string) => {
    const passwordScore = zxcvbn(password).score;
    console.log(passwordScore);
    return passwordScore > 3;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
    const valid = regex.test(event.target.value);
    setPassword(event.target.value);
    checkPasswordStrenth(event.target.value);
    setIsValid(valid);
  };

  const handleGoogle = () => {

    const button1 = document.getElementById("googleButton");
    const button2 = document.getElementById("SignUpDiv");
    button1?.addEventListener("click", function() {
      
    button2?.click();
});




  };
  return (
    // <div className="flex flex-col justify-start items-center mx-auto mb-12 sm:flex-row sm:mb-24">
    <div className=" relative flex flex-col items-center justify-center w-full px-6 pt-0 pb-24 lg:w-full text-gray-50 h-screen">
      <button className="bg-white font-bold font-sans text-black px-6 py-2 rounded-2xl mb-6"
        onClick={() => {
          navigate('/signin')
        }}
      >
        Sign In/Sign Up
      </button>
      <div className="items-start">
        <div>Username *</div>
        <input
          className="py-2 px-12 text-black font-sans font-bold rounded-2xl mb-4 w-[300px] sm:w-[400px]  text-center"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="items-start">
        <div>Email *</div>
        <input
          className="py-2 px-12 text-black font-sans font-bold rounded-2xl mb-4 w-[300px] sm:w-[400px]  text-center"
          placeholder="Email"
          onChange={(e) => {  
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="items-start">
        <div>Password *</div>
        <input
          className="py-2 px-12 text-black font-sans font-bold rounded-2xl  w-[300px] sm:w-[400px] text-center mb-8"
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <div className="items-start">
        <div>Confirm Password *</div>
        <input
          className="py-2 px-12 text-black font-sans font-bold rounded-2xl  w-[300px] sm:w-[400px] text-center mb-8"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row items-center mb-8">
        <div className="bg-white h-[2px]  w-[125px] sm:w-[175px] mr-3" />
        <span>Or</span>
        <div className="bg-white h-[2px]  w-[125px] sm:w-[175px] ml-3" />

        <div />
      </div>

      <button
      id="googleButton"
        className="bg-[#D01F25] hidden py-2 px-32 font-sans  w-[300px] sm:w-[400px] rounded-2xl  mb-6 hover:animate-pulse hover:bg-[#D01F25]  hover:text-gray-50  hover:shadow-lg hover:border-transparent "
        onClick={handleGoogle}
      >
        Google
      </button>
      <button
        className="bg-[#006dff] py-2 px-32 w-[300px] sm:w-[400px] font-sans rounded-2xl hover:animate-pulse hover:bg-[#006dff]  hover:text-gray-50  hover:shadow-lg hover:border-transparent "
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      {loading ? <div>loading</div> : <button className="hiddens mt-4" id="SignUpDiv"></button>}
    </div>
  );
}
