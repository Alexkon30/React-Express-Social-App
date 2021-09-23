import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Userpage from './pages/Usergape';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Userpage />
        </Route>
        <Redirect to="/" />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
