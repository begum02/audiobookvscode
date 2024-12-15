import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { supabase } from './supabaseClient'; // Supabase client'ını import ediyoruz

// AuthContext'i oluşturuyoruz
const AuthContext = createContext();

// AuthProvider componenti, context'i sağlayacak
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Kullanıcı durumu
  const [token, setToken] = useState(localStorage.getItem('token') || null); // JWT token
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || null); // Avatar durumu
  const [playlist, setPlaylist] = useState([]);

  // Sayfa yenilendiğinde avatar ve kullanıcı verilerini localStorage'dan alıyoruz
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    if (localStorage.getItem('avatar')) {
      setAvatar(localStorage.getItem('avatar'));
    }
  }, []);

  useEffect(() => {
    // API için baseURL ayarlıyoruz
    axios.defaults.baseURL = 'http://localhost:8080'; // Sunucunuzun adresini buraya ekleyin
    if (token) {
      // Token mevcutsa Authorization header'ı ayarla
      axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers['Authorization']; // Token yoksa header'ı kaldır
    }
  }, [token]);

  useEffect(() => {
    // Avatar bilgisini localStorage'a kaydediyoruz
    if (avatar) {
      localStorage.setItem('avatar', avatar);
    }
  }, [avatar]); // Avatar state'i değiştiğinde localStorage'a kaydedilir

  // Kullanıcıyı giriş yapmış olarak ayarlıyoruz
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Login isteği
      const response = await axios.post('/api/login', { email, password });
      const { token, user } = response.data;
  
      // Token ve kullanıcı bilgilerini localStorage'a kaydediyoruz
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Kullanıcıyı localStorage'a kaydediyoruz
  
      // Kullanıcıyı state'e kaydediyoruz
      setUser(user);
      setToken(token);
  
      // Avatar verisini alıyoruz ve state'e kaydediyoruz
      const avatarData = await getAvatar(user.id); // Avatar verisini alıyoruz
      setAvatar(avatarData); // Avatar'ı state'e ve localStorage'a kaydediyoruz
      localStorage.setItem('avatar', avatarData); // Avatar'ı localStorage'a kaydediyoruz
  
      return { success: true };
    } catch (error) {
      console.error(error.response || error.message || error);
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };
  
  // Kullanıcı kaydı
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/register', { username, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token); // Token'ı local storage'da saklıyoruz
      localStorage.setItem('user', JSON.stringify(user)); // Kullanıcıyı localStorage'a kaydediyoruz
      setUser(user);
      setToken(token);

      // Avatar verisini de alalım
      const avatarData = await getAvatar(user.id); // Avatar verisini alıyoruz
      setAvatar(avatarData); // Avatar'ı state'e ve localStorage'a kaydediyoruz

      return { success: true };
    } catch (error) {
      console.error(error.response || error.message || error);
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı çıkışı
  const logout = () => {
    setUser(null);
    setToken(null);
    setAvatar(null); // Avatar'ı sıfırlıyoruz
    localStorage.removeItem('token');
    localStorage.removeItem('avatar'); // Avatar'ı localStorage'dan siliyoruz
    localStorage.removeItem('user'); // Kullanıcıyı localStorage'dan siliyoruz
  };

  // Avatar almak için Supabase API çağrısı
  const getAvatar = async (userId) => {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('id, username')  // Kullanıcıyı seçiyoruz
        .eq('id', userId);  // Kullanıcıyı ID ile buluyoruz

      if (error || !users || users.length === 0) {
        return { error: 'Kullanıcı bulunamadı' };
      }

      const user = users[0];
      const initials = user.username ? user.username.split(' ').map(name => name[0]).join('').toUpperCase() : '';
      const avatarData = {
        initials,
        color: generateRandomColor(), // Avatar rengi
      };

      return avatarData;
    } catch (error) {
      console.error(error.response || error.message || error);
      return null;
    }
  };
  let color =null;
  // Rastgele renk oluşturma fonksiyonu
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
   

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color; // Rastgele renk döndürüyoruz
  };
  const fetchPlaylist = async () => {
    try {
      const response = await axios.get('/api/player-list');
      
      console.log('Full Response:', response.data);
  
      // Check for the specific structure you described
      if (response.data.success && Array.isArray(response.data.data)) {
        setPlaylist(response.data.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setPlaylist([]);
      }
    } catch (error) {
      console.error('Fetch Error:', error.response ? error.response.data : error.message);
      
      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        console.log('Error Response Status:', error.response.status);
        console.log('Error Response Headers:', error.response.headers);
      }
      
      setPlaylist([]);
    }
  };
  const addBook = async (bookId) => {
    try {
      const response = await axios.post('/api/player-list/add', { bookId });
      if (response.status === 200) {
        console.log('Kitap başarıyla eklendi:', response.data);
        fetchPlaylist();
      }
    } catch (error) {
      console.error('Add Book Error:', error.response?.data || error.message || error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.post('/api/player-list/remove', { bookId });
      if (response.status === 200) {
        console.log('Kitap başarıyla silindi:', response.data);
        fetchPlaylist();
      }
    } catch (error) {
      console.error('Delete Book Error:', error.response?.data || error.message || error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);
  return (
    <AuthContext.Provider value={{ user, avatar, login, register, logout, getAvatar, loading, fetchPlaylist, deleteBook, addBook,playlist}}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext'ten verileri alabileceğimiz custom hook
export const useAuth = () => useContext(AuthContext);
