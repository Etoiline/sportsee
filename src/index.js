import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'
import Main from './pages/dashboard/Main'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Template from './components/template/Template'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<App />} />
        <Route path="/user/:idUser" element={<Main />} />
      </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

