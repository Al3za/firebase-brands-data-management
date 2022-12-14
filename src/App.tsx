import React from 'react'
import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import BrandsData from './pages/SetCasinoDataPage';
import AuthRoute from './components/AuthRoute'
import { getFirestore } from 'firebase/firestore';
import DevLogin from './pages/DevLogin';
import DevRoute from './components/DevRoute';
import TestDev from './devPages/TestDev';
import PosNrData from './devPages/PosNrData';


// const app = initializeApp(config.firebaseConfig);
// export const storage= getStorage(app)
 const db = getFirestore()

export { db }

function App() {

  return (
       <Routes>
         <Route path='/' element={<AuthRoute><BrandsData/></AuthRoute>} />
         <Route path='/login' element={<LoginPage />} />
        <Route path='/signUp' element={< SignUpPage />} />
         <Route path='/devLogin' element={<DevLogin/>} />
      <Route path='/test' element={<DevRoute><TestDev /></DevRoute>} /> 
      <Route path='/DevData' element={ <DevRoute><PosNrData/></DevRoute> } /> 

       </Routes>
  );
}

export default App;

//https://www.youtube.com/watch?v=gm-bggVJb5k
   // video of subcollection
// https://github.com/CSFrequency/react-firebase-hooks/tree/v4.0.2/firestore#usecollectiondata
   // documentation of collections

 