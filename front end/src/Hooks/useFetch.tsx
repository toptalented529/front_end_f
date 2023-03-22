import { useState } from "react";

// Pass URL
const useFetch = (url:string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSign = async (response:any) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        if (data?.user) {
            let token = JSON.stringify(data?.user.token.token)
            if(token?.includes('"')){
                 token = token.split('"')[1]
            }
            let refreshToken = JSON.stringify(data?.user.token.refreshToken)
            if(refreshToken?.includes('"')){
              refreshToken = refreshToken.split('"')[1]
            }
    
          localStorage.setItem("user", JSON.stringify(data?.user));
          localStorage.setItem("JWT", token);
          localStorage.setItem("refreshToken", refreshToken);
          /////////////if google signin is signup go onboarding if sign in go to dashboard ///////////////////////
         if(data.user.signUpFlag){

             window.location.href = '/onboarding';
         }else{
            window.location.href = '/dashboard';
         }
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogleSign };
};

export default useFetch;