// supabaseQueries.js
const { supabase } = require('./supabaseClient');

// Kullanıcıya ait puanları almak
const getUserRatings = async (userId) => {
  const { data, error } = await supabase
    .from('user_ratings')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Kitapları almak
const getBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = { getUserRatings, getBooks };
