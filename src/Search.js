import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState(''); // Kullanıcı sorgusu
  const [results, setResults] = useState([]); // Arama sonuçları
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  // Arama sonuçlarını almak için API'yi çağıran fonksiyon
  const fetchResults = async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/search?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('API isteği başarısız oldu');
      }

      const data = await response.json();
      setResults(data); // Gelen veriyi state'e kaydet
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Arama sonuçlarını 300ms gecikmeli olarak almak için debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults(query); // Arama sorgusunu gönder
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Temizleme
  }, [query]);

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Kullanıcı girişini yakalar
        style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.title}</li> // Başlıkları listeler
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
