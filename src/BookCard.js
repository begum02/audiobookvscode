import React from "react";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import IconButton from '@mui/material/IconButton';

const BookCard = ({ book, onClick,id,key, onMouseDown}) => {
  return (
    <div
      className="card"
      onClick={onClick}
      onMouseDown={onMouseDown}
      id={id}
      key={key}
      style={{
        width: '204px',
        height: "auto",
        borderRadius: "20px",
        display: 'flex',
        justifyContent: "flex-start",
        alignContent:"space-between",
        flexDirection: "column",
      }}
    >
      <img
        className="card-img-top"
        src={book.image_url}
        style={{
          width: "164px",
          height: "150px",
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "15px",
        }}
        alt="Card image cap"
      />
      <div
        className="card-body"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <h5 className="card-title">{book.title}</h5>
      </div>
      <div style={{ }}>
        <IconButton sx={{ '&:focus': { outline: 'none' } }}>
          <PlayCircleFilledWhiteOutlinedIcon sx={{ width: "30px", height: "30px", color:"#3eb1c8"}} />
        </IconButton>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    width: "200px",
    textAlign: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  iconButton: {},
};

export default BookCard;
