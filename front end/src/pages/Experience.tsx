// import React from "react";
/**
 * @param {{ itemNumber: number; }} props
 */
import React from "react";
import { useParams } from "react-router-dom";
import { experiences } from "../data";
import { useNavigate } from "react-router-dom";
export const Experience: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }
  return (
    <div className="h-screen">
      <button  className="bg-slate-800 absolute top-8 left-3 text-white font-bold rounded-md px-4 py -2"
      onClick={handleClick}
      >back</button>
        <div className="bg-gray-600   m-0 mx-0  flex flex-col items-center w-full h-screen">
          <iframe
            src={experiences[Number(id)]}
            width={"100%"}
            height={"100%"}
            tabIndex={-1}
            title={"title"}
          ></iframe>
        </div>
      
    </div>
  );
};
