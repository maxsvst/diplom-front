import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import RegisterPage from './containers/register/RegisterPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<React.StrictMode><App/></React.StrictMode>}/>
    <Route path='registration' element={<RegisterPage/>}/>
  </Routes>
</BrowserRouter>
);


reportWebVitals();
