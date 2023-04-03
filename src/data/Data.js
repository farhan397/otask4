import {useState,useEffect} from 'react'
import Axios from "axios";

const baseURL="https://www.omdbapi.com/?i=tt3896198&apikey=6093c4"
const Data = () => {
    const [mydata, setdata] = useState([]);
    // console.log(mydata);
useEffect(() => {
   getApidata();
  
 
//     Axios.get(baseURL)
//       .then((Response) => {
//         setdata(Response.data);
       
//       })
//       .catch((error) => {
//         console.log(error);
//       });
   });

   const getApidata=()=>{
    Axios.get(baseURL)
          .then((Response) => {
            setdata(Response.data);
           
          })
          .catch((error) => {
            console.log(error);
          });
   }
}


export default Data
export const APIDate=Data.mydata

