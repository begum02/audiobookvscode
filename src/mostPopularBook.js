
const { supabase } = require('./supabaseClient');

const getPopularBooks = async (req,res) => {
    const userId = req.userId;

    try {
      // Popüler kitapları belirlemek için her kitap için ortalama rating hesaplıyoruz
      const { data, error } = await supabase
        .from('rating')  // "rating" tablosuna sorgu gönderiyoruz
        .select('book_id, avg(rating) as avg_rating')  // book_id ve ortalama rating alıyoruz
        .group('book_id')  // book_id'ye göre grupla
        .order('avg_rating', { ascending: false })  // ortalama ratinge göre azalan sırayla sıralıyoruz
        .limit(10);  // En popüler ilk 10 kitabı alıyoruz
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Kitap ID'lerini alıyoruz ve kitap bilgilerini almak için yeni bir sorgu gönderiyoruz
      const bookIds = data.map(book => book.book_id);
  
      // Kitapları 'book_id'ye göre filtreleyerek kitapların detaylarını alıyoruz
      const { data: books, error: booksError } = await supabase
        .from('books')  // "books" tablosundan kitap bilgilerini alıyoruz
        .select('*')
        .in('id', bookIds);  // Filtrelenen book_id'lere göre kitapları getiriyoruz
  
      if (booksError) {
        throw new Error(booksError.message);
      }
  
      return books;  // Popüler 10 kitabı döndür
    } catch (error) {
      console.error('Error fetching popular books:', error.message);
      return [];
    }
  };
  
  module.exports = getPopularBooks ;