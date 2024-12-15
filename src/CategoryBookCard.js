import React from 'react';
import PlayCircleOutlineSharpIcon from '@mui/icons-material/PlayCircleOutlineSharp';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

const Card = ({categoryName,categoryImage,onClick}) => {
 

  return (
    <div className="card"  onClick={onClick} style={{ width: '204px', height:"290px",  borderRadius:"20px",display:'flex', flexDirection:"column" ,position:"relative", zIndex:1}}>
      <img
        className="card-img-top"
        src={categoryImage}
         style={{width: "164px", height: "150px", marginTop:"20px", marginLeft:"auto", marginRight:"auto", borderRadius:"15px"}}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{categoryName}</h5>
       
        
      </div>
    
    </div>
  );
};

export default Card;
