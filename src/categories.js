
const { supabase } = require('./supabaseClient');
const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')  // 'categories' tablosuna sorgu yapıyoruz
      .select('*');         // Tüm kategorileri seçiyoruz

    if (error) {
      throw new Error(error.message); // Eğer hata varsa, hatayı yakalayıp fırlatıyoruz
    }

    return { success: true, categories: data };  // Başarılıysa kategorileri döndürüyoruz
  } catch (err) {
    return { success: false, error: err.message };  // Hata durumunda hata mesajını döndürüyoruz
  }
};

// Kategoriye göre kitapları almak için fonksiyon
const getBooksByCategoryId = async (categoryId) => {
  try {
    // Kitapları category_id'ye göre filtreleyerek çekiyoruz
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('category_id', categoryId); 

    if (error) {
      // Eğer Supabase hata döndürürse, o hatayı fırlatıyoruz
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      // Eğer veri boşsa, kategorinin kitapları bulunamadı mesajı veriyoruz
      return { success: false, message: `Kategori ID: ${categoryId} için kitap bulunamadı.` };
    }

    // Başarıyla kitaplar gelirse, bu kitapları döndürüyoruz
    return { success: true, books: data };
  } catch (err) {
    // Hata durumunda hata mesajını döndürüyoruz
    return { success: false, error: err.message };
  }
};

module.exports = { fetchCategories, getBooksByCategoryId };