import React from 'react';
import { Link } from 'react-router-dom';

function Registerfooter() {
  return (
    <div className="registration__footer">
      <div className="registration__footer__text">Already have an account?</div>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Registerfooter;
