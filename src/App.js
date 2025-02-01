import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatAnalyzer from "./pages/ChatAnalyzer.jsx";
import Login from './pages/Login.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Home is now Login */}
        <Route path="/chat" element={<ChatAnalyzer />} />
        <Route path="/signup" element={<SignUpPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
