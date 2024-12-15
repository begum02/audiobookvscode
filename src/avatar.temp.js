const { supabase } = require('./supabaseClient'); // Supabase client'ı dışa aktarılıyor

const generateAvatar = async (userId) => {
  // Kullanıcı verilerini Supabase'ten alıyoruz
  const { data: users, error } = await supabase
    .from('users')  // 'users' tablosuna sorgu gönderiyoruz
    .select('id, username')  // 'username' alanını alıyoruz
    .eq('id', userId);  // Kullanıcı ID'sine göre sorgulama yapıyoruz

  if (error || !users || users.length === 0) {
    return { error: 'Kullanıcı bulunamadı' }; // Kullanıcı bulunamazsa hata döndürüyoruz
  }

  const user = users[0]; // İlk kullanıcıyı alıyoruz

  // Kullanıcı adıyla avatarı oluştur
  const initials = user.username ? user.username.split(' ').map(name => name[0]).join('').toUpperCase() : '';  // İlk harfleri alıyoruz
  const avatarData = {
    initials,
    color: generateRandomColor() // Avatar için rastgele bir renk
  };

  return avatarData;  // Avatar verisini döndürüyoruz
};

// Rastgele bir renk oluşturma fonksiyonu
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

module.exports = { generateAvatar };
