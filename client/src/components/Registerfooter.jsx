import React, { useContext } from 'react';
import ModeContext from '../context/context';
import { Link } from 'react-router-dom';

function Registerfooter() {
  const { setMode } = useContext(ModeContext);

  return (
    <div className="registration__footer">
      <div className="registration__footer__text">Already have an account?</div>
      <Link to="/" onClick={() => setMode('login')}>Login</Link>
    </div>
  )
}

export default Registerfooter;
