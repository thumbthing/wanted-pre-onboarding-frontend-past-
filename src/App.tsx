import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={ MainPage } />
        <Route path='/signin' Component={ LoginPage } />
        <Route path='/signup' Component={ SignUpPage } />
        <Route path='todo' Component={ TodoPage } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
