import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

const AvatarPage = ({ userId }) => {
  const { getAvatar } = useAuth();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const data = await getAvatar(userId);
      setAvatar(data);
    };

    fetchAvatar();
  }, [userId, getAvatar]);

  if (!avatar) return <div>Loading avatar...</div>;

  return (
    <div>
      <h2>User Avatar</h2>
      <img src={avatar.url} alt="User Avatar" />
    </div>
  );
};

export default AvatarPage;
