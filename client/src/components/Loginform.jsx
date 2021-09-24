import React from 'react';
import Loginfooter from './Loginfooter';
import Input from './UI/Input';

function Loginform() {
  return (
    <div className="loginform">
      <div className="loginform__header">
        Login
      </div>
      <div className="loginform__body">
        <Input type="text" label="Username" name="user_name" />
        <Input type="password" label="Password" name="user_password" />
        <button className="loginform__btn">Login</button>

      </div>
      <Loginfooter />
    </div>
  )
}

export default Loginform;
