const { supabase } = require('./supabaseClient');

const searchBooks = async (query) => {
  try {
    const queryTrimmed = query.trim().toLowerCase();
    if (!queryTrimmed) {
      return []; 
    }
    
    const { data, error } = await supabase.rpc('search_books_by_first_letter', {
      first_letter: queryTrimmed
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  } catch (err) {
    console.error('Error searching books:', err.message);
    return [];
  }
};

module.exports = { searchBooks };