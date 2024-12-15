
const { supabase } = require('./supabaseClient');

const getBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*');
  
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Error fetching books: ' + error.message);
    }
  };
  
  // Belirli bir kitaba ait bölümleri getiren fonksiyon
  const getChaptersByBookId = async (bookId) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('book_id', bookId);
  
      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Error fetching chapters: ' + error.message);
    }
  };
  
  const getLatestBooks = async () => {
    

    
    try {
      const { data, error } = await supabase
        .from('books')  // "books" tablonuzun adı
        .select('*')    // Tüm sütunları seç
        .order('created_at', { ascending: false })  // created_at'a göre azalan sırayla
        .limit(10);  // Sadece 10 kitap al
  
      if (error) {
        throw new Error(error.message);
      }
      return data;  // Kitap verilerini döndür
    } catch (error) {
      console.error('Error fetching latest books:', error.message);
      return [];
    }
  };
  
  module.exports = {
    getBooks,
    getChaptersByBookId,getLatestBooks
  };