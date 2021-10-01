import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import Navbar from './components/Navbar';
import GlobalContext from './context/context';
import useRoutes from './routes';
import './styles/App.css';

function App() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPass: '',
    agreement: false
  })
  const { login, logout, token } = useAuth();

  const isAuth = !!token;
  const routes = useRoutes(isAuth);


  return (
    <GlobalContext.Provider value={{
      mode, setMode,
      form, setForm,
      login, logout, token, isAuth,
      // userId
    }}>
      <Router>
        <Navbar />
        {routes}
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
