import React, { useContext } from 'react';
import ModeContext from '../context/context';
import { Link } from 'react-router-dom';

function Loginfooter() {
  const { setMode } = useContext(ModeContext);

  return (
    <div className="loginform__footer">
      <div className="loginform__footer__text">Don't have an account?</div>
      <Link to="/register" onClick={() => setMode('register')}>Registration</Link>
    </div>
  )
}

export default Loginfooter;
