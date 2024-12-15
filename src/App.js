import React from 'react';
import { AuthProvider, useAuth } from './authContext'; // useAuth kancasını import edin
import LoginPage from './Login';
import RegisterPage from './Register';
import UserAvatar from './Avatar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Container from './audioplayer/Container';
import CategoriesLists from './CategoriesLists';
import BookLists from './BooksList';
import PlayerList from './PlayerList'

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // useAuth ile kullanıcı durumunu alın
  console.log(user); // Debugging için user'ı console.log ile kontrol edebilirsiniz.

  return (
    <div>
      {!user ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            marginLeft: '58%',
            marginTop: '30px',
          }}
        >
          <button
            onClick={() => navigate('/login')}
            style={{
              width: '150px',
              height: '40px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              width: '150px',
              height: '40px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Kaydol
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px',marginLeft:'53%'}}>
         <UserAvatar/>

        </div>
      )}
      <Container />
      <Sidebar />
      <CategoriesLists />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/category/:categoryId" element={<BookLists />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/playerlist" element={<PlayerList/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;