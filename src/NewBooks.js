import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { useNavigate } from "react-router-dom";
import BookCard from './BookCard';


const NewBooks = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/latest-books", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setLatestBooks(response.data);
        } else if (response.data && response.data.latestBooks) {
          setLatestBooks(response.data.latestBooks);
        } else {
          setLatestBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleScrollTo = (index) => {
    const container = document.getElementById("scrollContainer");
    const targetCard = document.getElementById(`book-${index}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h3 style={{ marginLeft: "20px" }}>Yeni Kitaplar</h3>
      <div id="scrollContainer" style={styles.cardContainer}     >
        {latestBooks && latestBooks.length > 0 ? (
          latestBooks.map((book, index) => (
            <div   id={`book-${index}`}
            key={book.id || index}>
            <BookCard
          
            book={book}
            onMouseDown={() => handleScrollTo(index)}
            
            />
            </div>
              
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    overflowX: "auto", // Yalnızca X yönünde kaydırma eklemek için
    marginLeft:"20px",
    scrollbarWidth: "none", // Kaydırma çubuğunu tarayıcıda gizler
    msOverflowStyle: "none", // Internet Explorer için kaydırma çubuğu gizleme
  },
};

export default NewBooks;
