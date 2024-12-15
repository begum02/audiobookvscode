import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./CategoryBookCard";
import { useNavigate } from "react-router-dom";

const CategoriesLists = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
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
    const targetCard = document.getElementById(`category-${index}`);
    if (container && targetCard) {
      const scrollPosition = targetCard.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: Math.max(0, scrollPosition), // 0'dan küçük olmasını engelle
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div style={styles.container}>
      <h3 style={{ marginLeft: "20px" }}>Kategoriler</h3>
      <div id="scrollContainer" style={styles.cardContainer}>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              id={`category-${index}`}
              key={category.id||index}
             
            >
              <Card
                categoryName={category.name}
                categoryImage={category.image_url}
                onClick={() => handleCategoryClick(category.id||index)} // Fonksiyon referansı geçiriliyor
                onMouseDown={() => handleScrollTo(index)}
              />
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};


const styles = {
  container: {
    padding: "0px",
    maxWidth: "1000px",
    margin: "20px 200px",
    
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

export default CategoriesLists;
