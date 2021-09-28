import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import GlobalContext from './context/context';
import useRoutes from './routes';
import { useAuth } from './hooks/auth.hook';

function App() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmedPass: '',
    agreement: false
  })
  //const [isAuth, setIsAuth] = useState(false);
  const { login, logout, token } = useAuth();
  //userId 


  // useEffect(() => {
  //   setIsAuth(!!token)
  // }, [token])
  const isAuth = !!token;
  const routes = useRoutes(isAuth);


  return (
    <GlobalContext.Provider value={{
      mode, setMode,
      form, setForm,
      login, logout, token, isAuth // userId
    }}>
      <Router>
        <Navbar />
        {routes}
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
