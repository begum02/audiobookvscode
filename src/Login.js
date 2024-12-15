import React, { useState } from 'react';
import { useAuth } from './authContext';  // useAuth kancasını kullanıyoruz
import { useNavigate } from 'react-router-dom';  // useNavigate hook'unu kullanıyoruz

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();  // login fonksiyonunu context'ten alıyoruz
  const navigate = useNavigate();  // yönlendirme yapmak için navigate kullanıyoruz

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);  // login fonksiyonunu çağırıyoruz

    if (response.success) {
      alert('Giriş başarılı!');
      navigate('/');  // Giriş başarılıysa anasayfaya yönlendiriyoruz
    } else {
      alert(response.error || 'Giriş yaparken bir hata oluştu');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
