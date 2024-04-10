
import React from 'react';
import CreateFizzBuzzResultsList from './components/CreateFizzBuzzResultsList';
import ResolveNumber from './components/ResolveFizzBuzzNumber';
import VerifyFizzBuzzResults from './components/VerifyFizzBuzzResults'; 
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import './style.css';
import NavBar from './components/NavBar';
function App() {
  return (    
    <BrowserRouter>
      <NavBar />
      <Routes>
      <Route  path="/"
        element={<ResolveNumber/>} />
      <Route  path="/verifyFizzBuzzResults"
        element={<VerifyFizzBuzzResults/>} />
      <Route  path="/resolveFizzBuzzNumber"
        element={<ResolveNumber/>} /> 
        <Route path="/createFizzBuzzResultsList"
        element={<CreateFizzBuzzResultsList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
