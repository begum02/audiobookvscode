import React, { useEffect } from 'react';
import { useAuth } from './authContext';

const PlayerList = () => {
  const {
    playlist,
    loading,
    fetchPlaylist,
    deleteBook,
    addBook
  } = useAuth();

  useEffect(() => {
    fetchPlaylist();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (!playlist || playlist.length === 0) {
    return <p>Çalma listesi boş.</p>;
  }

  return (
    <div>
      <h2>Çalma Listesi</h2>
      <ul>
        {playlist.map((item) => (
          <li key={item.id}>
            <span>{item.title} (Book ID: {item.book_id})</span>
            <button onClick={() => deleteBook(item.book_id)}>Sil</button>
            <button onClick={() => addBook(item.book_id)}>Ekle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;