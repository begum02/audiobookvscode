import React, { useContext } from 'react';
import AuthContext from './authContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Hoşgeldiniz, {user?.username || 'Misafir'}!</h1>
      {user && <button onClick={logout}>Çıkış Yap</button>}
    </div>
  );
};

export default Dashboard;
