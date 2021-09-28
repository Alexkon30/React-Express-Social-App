import React from 'react';
import { Link } from 'react-router-dom';

function Loginfooter() {
  return (
    <div className="loginform__footer">
      <div className="loginform__footer__text">Don't have an account?</div>
      <Link to="/register">Registration</Link>
    </div>
  )
}

export default Loginfooter;
