import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { useNavigate, useParams } from "react-router-dom";

const BookLists = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { categoryId } = useParams(); // URL'deki categoryId'yi al

  // Tüm kategorileri getir
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Belirli bir kategoriye ait kitapları getir
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/categories/${categoryId}/books`)
        .then((response) => {
          setBooks(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setBooks([]); // Eğer kategori seçilmediyse kitap listesini temizle
    }
  }, [categoryId]);

  // Kategori butonuna tıklandığında URL değiştir
  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>

<h2>
  {categories.find((category) => category.id === parseInt(categoryId))?.name || "Kategori Bulunamadı"}
</h2>
      <div style={styles.booksContainer}>
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))
        ) : (
          <p>Bu kategoride kitap bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    marginBottom: "20px",
  },
  categoryButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  booksContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    flexWrap: "wrap",
  },
};

export default BookLists;
