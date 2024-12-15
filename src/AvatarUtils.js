import { createClient } from '@supabase/supabase-js';

// Supabase bağlantısını başlat
const supabase = createClient(
  process.env.SUPABASE_URL, // Supabase URL
  process.env.SUPABASE_KEY  // Supabase API Key
);

// Rastgele bir renk oluşturma fonksiyonu
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Kullanıcı veritabanından avatar verisi oluşturma fonksiyonu
const generateAvatar = async (userId) => {
  // Supabase'den kullanıcı verilerini al
  const { data: users, error } = await supabase
    .from('users') // users tablosuna sorgu gönderiyoruz
    .select('id, name') // id ve name sütunlarını alıyoruz
    .eq('id', userId); // Kullanıcı ID'sine göre sorgulama yapıyoruz

  if (error || !users || users.length === 0) {
    return { error: 'Kullanıcı bulunamadı' };
  }

  const user = users[0]; // Kullanıcıyı alıyoruz (ilk kullanıcı)

  // Kullanıcı adıyla avatarı oluştur
  const initials = user.name.split(' ').map(name => name[0]).join('').toUpperCase(); // İlk harfleri al

  // Avatar için rastgele bir renk
  const avatarData = {
    initials,
    color: generateRandomColor() // Avatar için rastgele renk
  };

  return avatarData;
};

export { generateAvatar, generateRandomColor };
