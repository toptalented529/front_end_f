import fadaLogo from "../../assets/images/login.svg";
import {useNavigate } from "react-router-dom";
/**
 * @param {{ owner: string; }} props
 */
export function Login(): JSX.Element {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/signIn")
    }
  return (
    <div className="flex content-center w-auto pt-4  capitalize sm:w-auto sm:justify-end pr-4">

    <img className="" src ={fadaLogo} width={"30px"} alt ="" />

    <button onClick={handleClick} className="text-black bg-white pr-6 pl-6 ml-6 rounded-full">Login</button>

    </div>
  )

   
}
