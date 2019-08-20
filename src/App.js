import React from 'react';
import './App.css';
import Header from './Components/Header';
import Main_body from './Components/Main_body';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <div className="header"><Header/></div>
      <div className="body"><Main_body/></div>
      <div className="footer"><Footer/></div>
    </div>
  );
}

export default App;
