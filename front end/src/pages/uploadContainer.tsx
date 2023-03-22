
import { Dropzone } from "../components/FileUploads/Dropzone";

interface props {
    imageNumber: string[],
    itemNumber: number,
    onMessageChanges:(message:string) => void
}

 export const UploadContainer: React.FC<props> = (props) => {
 
  
  return (
    <div>
      <div className="bg-white pb-5 bg-opacity-75 absolute top-20 left-3 flex flex-col w-2/12 h-5/6 rounded justify-between">
        <div>
        {props.imageNumber.map((number , index) => {

          return(  <Dropzone key = {index} key_id = {index} imageID = {number} itemNumber = {props.itemNumber} onMessageChange={props.onMessageChanges} /> )
        } )
        
        }
        </div>
        <button onClick={() => {
          props.onMessageChanges("Refresh")
        }} className = "bg-white rounded w-6/12 self-center">Refresh</button>
      </div>
    </div>
  );
};
