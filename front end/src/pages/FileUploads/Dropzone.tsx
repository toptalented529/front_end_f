import React, {useCallback,useState} from "react";
import { useDropzone } from "react-dropzone";
import img from "./upload.png";
import axios from 'axios'
interface props {
    imageID:string,
    itemNumber:number,
    key_id:number,
    onMessageChange:(message:string) =>void
}

export const Dropzone: React.FC<props> = (props) => {
  const [selectedFile,setSelectedFile] = useState<any>(null)
  const [imageUrl,setImageUrl] = useState<any>(null)
  

  const onDrop = useCallback(async (acceptedFiles:File[]) => {

    const formData = new FormData()

    setSelectedFile(acceptedFiles[0])

    setImageUrl(URL.createObjectURL(acceptedFiles[0]))

    formData.append('file',acceptedFiles[0])
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/v1/upload/image',formData, {
        headers: {
          'Content-Type':'multipart/form-data',
          "item":props.itemNumber,
          "key_id":props.key_id
        }
      })
      if(response.data.message === 'Image uploaded successfully'){
        props.onMessageChange(response.data.message)
      }
      console.log(response.data.message)
    }catch(e) {
      console.log(e)

    }
  },[])
   
  const { getRootProps, getInputProps,isDragActive } = useDropzone({onDrop});
  return (
    <div className ="flex flex-col wx-auto items-center mb-2 mt-2 rounded-md  " >
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-11/12 rounded-md bg-white mt-2 self-center opacity-1"
      >
        <input className="input-zone" {...getInputProps()} />
       {!isDragActive &&
        <div className="text-center">
        {selectedFile?<img src={imageUrl} alt="Uploaded Image" />: <img
            src={img}
            width={"80px"}
            height={"10px"}
            alt="upload"
            className="mx-auto"
          /> 
        }
        </div>
      }
          {/* {selectedFile &&  <img src={imageUrl} alt="Uploaded Image" />} */}

      </div>
      <p>Paintings</p>
    </div>
  );
};
