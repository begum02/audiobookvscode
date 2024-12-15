import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useAuth } from './authContext'; // useAuth hook'unu import

export default function UserAvatar() {
  const { user, getAvatar } = useAuth(); // Kullanıcı verisi ve avatar alma fonksiyonu
  const [avatar, setAvatar] = useState(null); // Avatar verisi için state
  const [loading, setLoading] = useState(true); // Loading durumu

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        try {
          const avatarData = await getAvatar(user.id); // Avatar verisini alıyoruz
          
          if (avatarData) {
            setAvatar(avatarData); // Avatar verisini state'e kaydediyoruz
            // Avatar verisini localStorage'a JSON.stringify ile kaydediyoruz
            localStorage.setItem('avatar', JSON.stringify(avatarData)); // JSON.stringify kullanmak zorundayız
          }
        } catch (error) {
          console.error('Avatar alınırken hata oluştu:', error);
        }
      } else {
        // Eğer avatar verisi localStorage'da varsa, onu alıyoruz
        const storedAvatar = localStorage.getItem('avatar');
        if (storedAvatar) {
          setAvatar(JSON.parse(storedAvatar)); // JSON.parse ile avatar verisini doğru formatta alıyoruz
        }
      }
      setLoading(false); // Loading durumu sonlanır
    };

    // Eğer kullanıcı girişi varsa avatar'ı fetch et
    if (user) {
      fetchAvatar();
    } else {
      // Kullanıcı çıkışı yapıldıysa, localStorage'dan avatar verisini temizle
      setAvatar(null);
    }
  }, [user]); // user değiştiğinde avatar'ı tekrar al

  if (loading) {
    return <div>Loading...</div>; // Loading durumu
  }

  if (!avatar) {
    return <div>No Avatar Found</div>; // Avatar verisi yoksa
  }

  return (
    <Stack direction="row" spacing={2}>
      {avatar && avatar.initials ? (
        // Eğer avatar objesi varsa ve initials varsa, bunu göster
        <Avatar sx={{ bgcolor: avatar.color }}>
          {avatar.initials}
        </Avatar>
      ) : (
        // Eğer avatar verisi yoksa, sadece bir yedek gösterim yapabiliriz
        <Avatar>
          ? {/* Yedek bir avatar gösterimi */} 
        </Avatar>
      )}
    </Stack>
  );
}
