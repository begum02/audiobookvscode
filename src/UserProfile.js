import React from 'react';
import Avatar from '@mui/material/Avatar';
import { useAuth } from './authContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null; // Kullanıcı giriş yapmamışsa bir şey göstermeyin

  const getInitials = (name) => {
    if (!name) return '?';
    const [firstName, lastName] = name.split(' ');
    return `${firstName[0]}${lastName?.[0] || ''}`.toUpperCase(); // İlk harfleri al ve büyük harfe çevir
  };

  return (
    <Avatar sx={{ bgcolor: 'blue', color: 'white' }}>
      {getInitials(user.name)}
    </Avatar>
  );
};

export default UserProfile;
