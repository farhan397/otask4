

import axios from 'axios';
import React, { useState,useEffect } from 'react'
import Card from '../Card/Card';


const MovieCard = ({movies}) => {
    const [filterarray, setfilterarray] =useState([]);
    const [first, setFirst] = useState(10);
     const [dropdownpage, setdropdownpage] = useState(0);
    console.log("ghgvhygvhvgh",filterarray)
    const [rows, setRows] = useState(0);
   
  return (
   <>
   
      <div
        className="parentContainer"
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "1px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      
        {rows === 0 &&
    
    movies.sort(function (a, b) {
      if (a.Title < b.Title) {
        return -1;
      }
      if (a.Title > b.Title) {
        return 1;
      }
      return 0;
    })
            .map((card, index) => 
           
            <Card item={card} key={index} />)}
        {rows === 1 &&
          movies
              .slice(1, dropdownpage)
            .map((card, index) => <Card item={card} key={index} />)}
            
      </div>
      <div style={{marginBottom: "10px",position: "sticky",}} >
        <div
          class="select1"
          style={{
            marginBottom: "10px",
            position: "sticky",
            // width:100,
            marginLeft: "80%",
            backgroundColor: "blue",
          }}
        >
          <select
            name="format"
            id="format"
            style={{
              appearance: "none",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            onChange={(e) => {
              setdropdownpage(e.target.value);
              setRows(1);
            }}
          >
            <option selected value={8}>
              8
            </option>

            <option value={3}>2</option>
            <option value={5}>4</option>
            <option value={7}>6</option>
            <option value={9}>8</option>
            <option value={11}>10</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default MovieCard
