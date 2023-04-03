import React,{useState} from 'react'
import { BiMessageSquareX} from "react-icons/bi";

import "./Card.css"

const Card = ({item}) => {
    const [expanded, setExpanded] = useState(false);
  // const img=  props.img_src;

    
  return (
   <>
      {expanded ? (
        
         <ExpandedCard param={item} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={item} setExpanded={() => setExpanded(true)} />
      )}
   
   </>
  )
}
const getDatafromLS=()=>{
  const data = localStorage.getItem('saveinfos');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}
function CompactCard({ param, setExpanded }) {
  const [saveinfo, setsaveinfo] = useState(getDatafromLS);
  const [namerover, setnamerover] = useState("");
  const [dateearth, setdateearth] = useState("");
  const [count, setcount] = useState(0);
  const [status, setstatus] = useState(count);

    return (
        <>
        <div className="fullcard"> 
      <div
         className="CompactCard"
        style={{
          position:'relative'

        }}
         onClick={setExpanded}
        
      >
       
         <img src={param.Poster} alt="Imgcard"/>   
          <div className="radialbar"
          style={{
            position:'absolute'
  
          }}
          >
            <div className="roverclass">
          <span>{param.Year}</span>
          </div>
          <div className="dateclass">
          {/* <span>${param.Rated}</span> */}
          </div>
          
          </div>
          
        </div>
        <div>
        <span style={{
          marginLeft:'20px'
        }}>{param.Title}</span> 
          </div>
          </div>

      </>
    );
  }
  function ExpandedCard({ param, setExpanded }) {
    

      return(

        <div
      className="ExpandedCard1"
      style={{  
        justifyContent:'center',
        alignItems:'center'  
      }}
      layoutId="expandableCard"
    >
      
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
      <BiMessageSquareX onClick={setExpanded} />
      </div>
      
      <img src={param.Poster} alt="Imgcard" style={{
        width:'300px',
        height:'300px'
      }}/>
        <span><b>Title:</b> { param.Title}</span>
        <span><b>YEAR:</b>{param.Year}</span>
        <span><b>IMD ID:</b>{param.imdbID}</span>
        <span><b>TYPE:</b>{param.Type}</span>
        
        {/* <span>{param.earth_date}</span> */}
      
      <span>Last 24 hours</span>
    </div>
      )
  }

export default Card
