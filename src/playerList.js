const { supabase } = require('./supabaseClient');


// Kitap silme fonksiyonu
const removeBookFromPlayerList = async (req, res) => {
  const { bookId } = req.params; // URL parametresi olarak gelen bookId

  try {
    // playerlists tablosundan kitap silme
    const { data, error } = await supabase
      .from('playerlists')
      .delete()
      .eq('book_id', bookId)
      .eq('user_id', req.userId); // Kullanıcı ID ve kitap ID ile silme işlemi

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, data }); // Silinen kitap verisi
  } catch (err) {
    console.error('Error removing book from player list:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const getPlayerBooks = async (req, res) => {
  const userId = req.userId; // Middleware'den gelen userId

  if (!userId) {
    return res.status(400).json({ success: false, error: 'UserId is missing' });
  }

  try {
    // İlk olarak, playerlists tablosundan kitap bilgilerini alıyoruz
    const { data: playerBooks, error: playerBooksError } = await supabase
      .from('playerlists')
      .select('id, book_id, added_at')
      .eq('user_id', userId); // Kullanıcıya ait kitapları sorguluyoruz

    if (playerBooksError) {
      throw new Error(playerBooksError.message);
    }

    // Eğer playerBooks verisi boşsa, hata döndürüyoruz
    if (!playerBooks || playerBooks.length === 0) {
      return res.status(404).json({ success: false, error: 'No books found for this user.' });
    }

    // İkinci olarak, books tablosundan kitap bilgilerini alıyoruz
    const bookIds = playerBooks.map(book => book.book_id); // playerlists'teki book_id'leri alıyoruz

    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('id, title, author_id')
      .in('id', bookIds); // Book_id'leri ile kitapları sorguluyoruz

    if (booksError) {
      throw new Error(booksError.message);
    }

    // Eğer books verisi boşsa, hata döndürüyoruz
    if (!books || books.length === 0) {
      return res.status(404).json({ success: false, error: 'No books data found.' });
    }

    // playerBooks ve books verilerini manuel olarak birleştiriyoruz
    const result = playerBooks.map(playerBook => {
      const book = books.find(b => b.id === playerBook.book_id);

      // Eğer book verisi bulunamazsa, hata döndürüyoruz
      if (!book) {
        return null; // Null döndürerek eksik veriyi gösterebiliriz.
      }

      return {
        id: playerBook.id,
        book_id: playerBook.book_id,
        added_at: playerBook.added_at,
        title: book.title,
        author_id: book.author_id,
      };
    }).filter(item => item !== null); // Null değerleri filtreliyoruz.

    return res.status(200).json({ success: true, data: result });

  } catch (err) {
    console.error('Error fetching player books:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const addBook = async (bookId) => {
  try {
    // bookId'yi doğru formatta gönderiyoruz
    const response = await axios.post('/api/player-list/add', { bookId });
    if (response.status === 200) {
      console.log('Kitap başarıyla eklendi:', response.data);
      fetchPlaylist(); // Listeyi tekrar çek
    }
  } catch (error) {
    console.error('Kitap eklenirken hata oluştu:', error);
  }
};


module.exports = { addBook,removeBookFromPlayerList, getPlayerBooks,addBook};
