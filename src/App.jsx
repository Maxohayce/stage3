import React from 'react';
import Gallery from './gallery/gallery';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './login/login';
import SignUp from './signup/signup';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
