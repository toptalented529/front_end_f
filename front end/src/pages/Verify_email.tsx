import { useState,useEffect } from "react";
import axios from "axios";

export default function VerifyEmail(): JSX.Element {
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=> {
        const verifyEmail = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get('token');
            if (token) {
               const response =await axios.post('http://localhost:8000/v1/auth/verify-email',{ token }
               ,{
                headers :{
                    "authentication": `Bearer ${localStorage.getItem("JWT")}`,
                    "x-refresh-token":`Bearer ${localStorage.getItem("refreshToken")}`
                }
               }, 
               )
                if(response.data.success){
                    setVerified(true);
                    setError('');
                    // Redirect to login page or other appropriate page
                    window.location.href = '/onboarding';
                }
              } else {
                setVerified(false);
                setError('Invalid verification link.');
                window.location.href = '/';

              }
        }


        verifyEmail()
 


    }, [])



  return (
    <div className=" bg-black ">
     <div>{verified}</div>
     <div>{error}</div>
    </div>
  );
}
