import React from 'react';
import Rating from '@mui/material/Rating';
import StarRateIcon from '@mui/icons-material/StarRate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
const BookImageAndRating=()=>{
  return(
    <>
    <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHwjGDYxrjLxDrjqqPLeyiynPxf4wQcefNog&s" style={{width:"250px", height:"250px", borderRadius:"20px"}} alt=""/>
      <h3>thtyu</h3>
      <Rating name="half-rating" defaultValue={0} precision={1} sx={{color:"#3eb1c8"}} />


  


    </div>
    </>
  )

}

const VerticalLineMenu = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection:"column",
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* Üst yatay çizgi */}
      <div style={{ borderTop: '1px solid #ccc', width: '40vw', marginBottom: '10px' }}></div>

      {/* Menü öğeleri */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
       
        }}
      >
        {/* Puan */}
        <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{ fontWeight: 'bold' , position:"relative" ,left:"10px"}}>Puan</div>
        <div style={{ display: 'flex',flexDirection:"row" ,alignItems: 'center', marginLeft: '10px' }}>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="#3eb1c8"
          >
            <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
          </svg> 
          4.7
        </div>
        </div>

        {/* Dikey çizgi */}
        <div
          style={{
            borderLeft: '1px solid #ccc',
            height: '40px',
            margin: '0 10px',
          }}
        ></div>

        {/* Menü öğesi 2 */}
        <div style={{display:"flex",flexDirection:"column"}}>
           <div style={{fontWeight:"bold"}}>Süre</div>
          <div style={{display:"flex",flexDirection:"row"}}>
           <AccessTimeIcon sx={{width:"24px",height:"24px", color:"#3eb1c8"}}/> 
           <span>13dk 50s</span>
          </div>
          
        </div>

        {/* Dikey çizgi */}
        <div
          style={{
            borderLeft: '1px solid #ccc',
            height: '40px',
            margin: '0 10px',
          }}
        ></div>

        {/* Menü öğesi 3 */}
        <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{fontWeight:"bold"}}>Kategori</div>
        <div style={{display:"flex",flexDirection:"row"}}>
          <BookIcon sx={{width:"24px",height:"24px", color:"#3eb1c8"}}/>
          <span>Roman</span>
          </div>
        </div>
      </div>

      {/* Alt yatay çizgi */}
      <div style={{ borderTop: '1px solid #ccc', width: '40vw', marginTop: '10px' }}></div>
    </div>
  );
};

 export default function  bookDetails() {
  return(
    <div >
    <BookImageAndRating/>
    <VerticalLineMenu/>
    <p>  </p>

    </div>
  )
}