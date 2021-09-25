import React, { createContext, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Userpage from './pages/Usergape';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './styles/App.css';
import ModeContext from './context/context';

function App() {
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPass: '',
    agreement: false
  })

  return (
    <ModeContext.Provider value={{
      mode,
      setMode,
      user,
      setUser
    }}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user">
            <Userpage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ModeContext.Provider>
  );
}

export default App;
