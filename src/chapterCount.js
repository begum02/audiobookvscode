const { supabase } = require('./supabaseClient');


async function getBookChapterCount(bookId) {
    const { data, error } = await supabase
      .from('books')
      .select('chapter_count') // Sadece chapter_count sütununu seç
      .eq('id', bookId); // Kitap ID'sini eşleştir
  
    if (error) {
      console.error('Bölüm sayısı alınırken hata oluştu:', error);
    } else {
      if (data.length > 0) {
        console.log('Bölüm sayısı:', data[0].chapter_count);
        return data[0].chapter_count; // Bölüm sayısını döndür
      } else {
        console.log('Kitap bulunamadı.');
      }
    }
  }
  
  module.exports = {getBookChapterCount};