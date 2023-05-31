import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notification from './pages/Notification';
import Layout from './layouts/layout';
import Categories from './pages/Categories';
import Channels from './pages/Channels';


function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="notification" element={<Notification />} />
            <Route path="categories" element={<Categories />} />
            <Route path="channels" element={<Channels />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
