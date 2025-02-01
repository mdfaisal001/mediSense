import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatAnalyzer from "./pages/ChatAnalyzer.jsx";
import Login from './pages/Login.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import Lander from './pages/Lander.jsx';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Lander/>} /> {/* Home is now Login */}
        <Route path="login" element={<Login />} /> {/* Home is now Login */}
        <Route path="/chat" element={<ChatAnalyzer />} />
        <Route path="/signup" element={<SignUpPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
