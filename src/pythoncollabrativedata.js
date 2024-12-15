// supabaseQueries.js
const { supabase } = require('./supabaseClient');

// Kullanıcı puanlarını almak için fonksiyon
const getUserRatings = async () => {
  const { data, error } = await supabase
    .from('ratings') // ratings tablosu (user_id, book_id, rating)
    .select('*');
  
  if (error) {
    console.error('Error fetching user ratings:', error);
    return [];
  }
  return data;
};

// Kitap bilgilerini almak için fonksiyon
const getBooks = async () => {
  const { data, error } = await supabase
    .from('books') // books tablosu (book_id, title, category)
    .select('*');
  
  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }
  return data;
};

module.exports = { getUserRatings, getBooks };
