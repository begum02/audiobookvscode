import React from 'react';
import './Sidebar.css'; // Stil dosyasını import ediyoruz
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
  
const navigate=useNavigate();
const handleSearchClick=()=>{
  navigate('/search')
}
const handlePlayerList=()=>{
  navigate('/playerlist')
}

 
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>My App</h2>
      </div>
      <ul className="sidebar-links">
        <li><a href="#">Anasayfa</a></li>
        <li onClick={handleSearchClick}>Arama</li>
        <li onClick={handlePlayerList}>Çalma Listesi</li>
        <li><a href="#">Son Dinlenenler</a></li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
