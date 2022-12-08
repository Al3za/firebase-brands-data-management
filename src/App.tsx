import React from 'react'
import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import { config } from './config/Config';
import { initializeApp } from 'firebase/app';
import BrandsData from './pages/SetCasinoDataPage';
import AuthRoute from './components/AuthRoute'

initializeApp(config.firebaseConfig);

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<AuthRoute><BrandsData/></AuthRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signUp' element={< SignUpPage />} />

      </Routes>
    
  );
}

export default App;
