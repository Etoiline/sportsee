import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'
import Main from './pages/dashboard/Main'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Template from './components/template/Template'
import SrcProvider from './services/SrcProvider'
import Error from './pages/error/Error'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SrcProvider>
    <Router basename='/LauraCasteran_12_13042022' >
      <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<App />} />
        <Route path="/user/:idUser" element={<Main /> }/>
        <Route path="*" element={<Error /> }/>
        {/* <Route path="/user/mock/:idUser" element={<Main />} /> */}
      </Route>
      </Routes>
    </Router>
    </SrcProvider>
  </React.StrictMode> 
);

