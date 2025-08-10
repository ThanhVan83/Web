import { createServer ,Model ,Factory} from "miragejs"

import dog from "../avatar/dog.png";
import nai from "../avatar/nai.png";
import river from "../avatar/river.png";
import avatar1 from "../avatar/avatar1.jpg";
import avatar2 from "../avatar/avatar2.jpg";
import avatar3 from "../avatar/avatar3.jpg";
import avatar4 from "../avatar/avatar4.jpg";
import avatar5 from "../avatar/avatar5.jpg";



const avatars = [dog, nai, river]
export function makeServer() {
  createServer({
    models:{
      user:Model,
      photo:Model,
      tag:Model
    },
    factories:{
      tag:Factory.extend({
        id(i) {
          return String (i+1)
        },

        name(){
          return 'tag'
        },

        results(){
          return '50 question'
        }
      }),

      user:Factory.extend({
        id(i) {
          return String(i+1)
        },
        image() {
          return avatar5
        },
        fullname(){
          return 'Fullname'
        },
        
        username(){
          return '@username'
        },

        isFollower(){
          return true
        },
        isFollowing(){
          return false
        }


      })

    },

    seeds(server){
       
      
      Array.from({ length: 100 }, (_, i) => {
    server.create("photo", {
      id: String(i + 1),
      title: `This is a title`,
      username: `by username`,
      image: avatars[i % avatars.length],
    })
    })

    server.create('tag',{name:'Cool',results:'350 result'})
    server.create('tag',{name:'Beatiful',results:'210 result'})
    server.create('tag',{name:'Easy',results:'190 result'})
    server.create('tag',{name:'Sumary',results:'105 result'})
    server.create('tag',{name:'Hot',results:'80 result'})
    server.create('tag',{name:'Passage Spectific'})
    server.create('tag',{name:'Very long taaaaaaaaaaaa'})
    server.createList('tag',38)


    server.create('user',{image:avatar1})
    server.create('user',{image:avatar2})
    server.create('user',{image:avatar3,isFollowing:true})
    server.create('user',{image:avatar4})
    server.create('user',{image:avatar5,isFollowing:true})
    server.create('user',{image:avatar1,isFollower:false,isFollowing:true})
    server.create('user',{image:avatar3,isFollower:false,isFollowing:true})
    server.create('user',{image:avatar4,isFollower:false,isFollowing:true})
    server.create('user',{image:avatar5,isFollowing:true})
    server.createList('user',100)
     
    

    
  
       
    },


    routes() {
      this.namespace = "api"

      this.get("/tags", (schema:any) => {
  return { tags: schema.tags.all().models }; 
  });

      this.get("/photos", (schema:any,request) =>{
         let page=Number(request.queryParams.page) || 1;

         let perPage=9;

         let allPhotos=schema.photos.all().models;

         let paginated=allPhotos.slice((page-1)*perPage,page*perPage);

         return{
          photos:paginated,
          total:allPhotos.length
         }


      } );

      this.get("/users",(schema:any,request) =>{
        let page=Number(request.queryParams.page) || 1;

         let perPage=13;

         let allusers=schema.users.all().models;

         let paginated=allusers.slice((page-1)*perPage,page*perPage);

         return{
          users:paginated,
          total:allusers.length
         }

      })

    }
  })
}
