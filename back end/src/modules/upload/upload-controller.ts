import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { IBaseController } from '../../common/interfaces/base-controller-interface';
import { convertToObjectOrEmptyObject } from '../../common/utils/common';
import { uploadSchema } from './upload_schema';
// import { IUploadRes } from './upload-interfaces';
import { s3Instance } from '../../configs/awsS3';
import axios from 'axios'
import { r, rtp, RT } from "@gmetrixr/rjson";
import { fn } from '@gmetrixr/rjson/lib/cjs/r';
import { items } from './data';
import { ProjectService } from './projectService';
import { IProjectsDto } from './projectInterface';


export class UploadController implements IBaseController {
  public routerPrefix = '/upload';

  public constructor(private readonly _projectService: ProjectService){}

  public initRouter(app: FastifyInstance, opts: FastifyPluginOptions): void {
    app.post('/image',{
        handler:this._upload,
        // schema: uploadSchema.image,
        
        // preValidation: [app.verifyJwtAccessToken],

    })

    app.get("/items",{
      handler: this._items
    })


    ////////////////this part is for register for editing project part that will be showing on dashboard.///////////
    app.get("/getprojects",{
      handler: this._getProjects
    })
    app.post("/setprojects",{
      handler:this._setProject,
    }
    )


    //////////////////////////////////// to publish project to fada //////////////////////

    app.post("/setPublish",async (req:any, res:any)  => {
      ///// projectName means that the sub.fada.xyz/project publishURL is gmetri project url
      const {projectName,publishURL} = req.body
      const result = await this._projectService.setPublishURL(projectName,publishURL);

      res.code(200).send({res:result})
    })

    app.get("/getpublished", async (req:any, res:any) => {
      const hostname_path = req.query.hostname
      
      const projectUrl = await this._projectService.getByURL(hostname_path)
      console.log("8888888888888888888",projectUrl)
      if(projectUrl === undefined || projectUrl === null){
        res.code(404).send({res:"doesn't exist!"})
      }else{

        res.code(200).send({project:projectUrl})
      }

    })







  }


  private _getProjects = async (req:any, res:any) => {
    const result = await this._projectService.getAll()
    res.code(200).send({result:result})
  }

  
  private _setProject = async (req:any, res:any) => {
      const { id, image_id ,urls, uuid} = req.body;
      console.log("222222222222222222",image_id)
      const result = await this._projectService.createOne(
        convertToObjectOrEmptyObject<IProjectsDto>({
          id:id ,
          imageId:image_id ,
          urls:urls ,
          uuid: uuid ,
        }),
        );
        
      res.code(200).send({res:result})
      
  }

  

  private _upload = async (req:any,res:any)  => {

    try {
    // const image = req.body.file;
    const item_data = this._projectService.getAll()
    console.log(item_data)

    //////////////////////////////////////////////////////
    const image = req.raw.files.file;
    console.log("Latest",req)
    const itemnumber  = req.raw.headers.item
    const key_id = req.raw.headers.key_id
    const s3Params = {
      Bucket: String(process.env.BUCKET),
      Key: `images/${image.name}`,
      Body: image.data
    };


    try {
      const s3Response = await s3Instance.upload(s3Params).promise();
      console.log("herer",s3Response)
      try {
        const response = await axios.post("https://api.gmetri.com/sdk/file/uploadFileFromURL",
          {
            orgSlug:"novdyn",
            url: s3Response.Location

          },{
            headers: {
             Authorization:"Token 966096985a187442f0491eb557a20c962715f97fdf603027f077219aeb6b14c181dcd2d0c736cf55e1bdd69604982ffd78a9bf3eb8035e685b6b19d988932150"
  
            },},
        )

        const fileID = response.data.data.id
        const file_URL = response.data.data.file_urls.o;
        console.log("FileUpload is here",response.data)

            try {
              const response = await axios.post("https://api.gmetri.com/sdk/project/getJSON",{
                projUuid:items[itemnumber].uuid
              },{
                headers: {
                  Authorization:"Token 966096985a187442f0491eb557a20c962715f97fdf603027f077219aeb6b14c181dcd2d0c736cf55e1bdd69604982ffd78a9bf3eb8035e685b6b19d988932150"
       
                 },
              }
              )
              if(response){

                console.log("1111",response.data,fileID)
                const fileSource: fn.Source  = {
                  "file_urls": {
                    "o": file_URL,
                  },
                  "id":fileID,

                }
                const projectFactory = r.project(response.data.data)
                const scene = projectFactory.getRecord(RT.scene, projectFactory.getInitialSceneId())
                if(scene) {
                  const sceneFactory = r.scene(scene)
                  const image = sceneFactory.getRecord(RT.element,Number(items[itemnumber].imageId[key_id]))
                  if(image) {
                    const elementFactory = r.element(image);
                    elementFactory.set(rtp.element.source,fileSource)
                    console.log("2222",scene)
                    try {
                     
                    
                    const res = await axios.post("https://api.gmetri.com/sdk/project/updateJSON",{
                      projUuid:items[itemnumber].uuid,
                      json:projectFactory.json()
                    },{
                      headers: {
                        Authorization:"Token 966096985a187442f0491eb557a20c962715f97fdf603027f077219aeb6b14c181dcd2d0c736cf55e1bdd69604982ffd78a9bf3eb8035e685b6b19d988932150"
             
                       },
                    })
                  }catch(error) {
                    console.log("update error",error)
                  }

                  }
                }

              }




            }catch(error){
              console.log("getting Json from Project invalid",error)
            }









      } catch(error) {
        console.log(error,"dddd")
      }



      res.code(200).send({
        message: 'Image uploaded successfully',
        data: {
          imageUrl: s3Response.Location,
          imageKey: s3Response.Key
        }
      });
    }catch(error){
      res.code(500).send({ message: 'Failed to upload image', error });
    }



  }catch(error) {
    console.log(error)
  }
     

  }


  private _items =async (req:any,res:any) => {

    res.code(200).send({"items":items})
    
  }

}
