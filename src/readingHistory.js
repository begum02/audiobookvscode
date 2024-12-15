const { supabase } = require('./supabaseClient');

const getUserBooks = async (req,res) => {
  const userId = req.userId; // Middleware'den gelen userId
  // Kullanıcının okuduğu kitapları almak için reading_history tablosunu sorgula
  const { data: userReadingHistory, error: historyError } = await supabase
    .from('reading_history') // reading_history tablosu (user_id, book_id, read_date, vb.)
    .select('book_id') // book_id'yi seçiyoruz çünkü kullanıcının okuduğu kitapları alacağız
    .eq('user_id', userId);  // Verilen userId ile eşleşen kitapları al
  
  if (historyError) {
    console.error('Error fetching user reading history:', historyError);
    return [];
  }

  // Kitap bilgilerini almak için books tablosunu sorgula
  const bookIds = userReadingHistory.map(item => item.book_id);  // Okunan kitapların ID'lerini al
  const { data: books, error: booksError } = await supabase
    .from('books') // books tablosu (book_id, title, category, vb.)
    .select('*')
    .in('book_id', bookIds); // Kullanıcının okuduğu kitapları al

  if (booksError) {
    console.error('Error fetching books:', booksError);
    return [];
  }

  return books;  // Kullanıcının okuduğu kitapların listesini döndür
};

module.exports = {  getUserBooks };