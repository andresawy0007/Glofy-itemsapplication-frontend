import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage.jsx'
import ListItemPage from './components/ListItemPage.jsx'
import ItemDetailPage from './components/ItemDetailPage.jsx';
import IndexPage from "./components/IndexPage.jsx";
import VideoRecordPage from "./components/VideoRecordPage.jsx";

import './App.css'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <IndexPage /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/items"
          element={isAuthenticated ? <ListItemPage /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route 
          path="/item/:id" 
          element={isAuthenticated ? <ItemDetailPage /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/item/:id/video-record"
          element={isAuthenticated ? <VideoRecordPage setIsAuthenticated={setIsAuthenticated} /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App
