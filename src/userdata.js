const express = require('express');
const { supabase } = require('./supabaseClient');
const app = express();
const port = 3000;

// Kullanıcı verilerini almak için fonksiyon
const getUserData = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('full_name')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }

  return data;
};

// Avatar oluşturma fonksiyonu
const generateAvatar = async (userId) => {
  const user = await getUserData(userId);

  if (user) {
    const firstLetter = user.full_name.charAt(0).toUpperCase();
    return {
      avatar: firstLetter
    };
  } else {
    return {
      avatar: '?'
    };
  }
};

// Avatar API endpoint'i
