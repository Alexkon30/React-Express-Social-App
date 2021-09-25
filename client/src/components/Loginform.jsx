import React, { useContext, useEffect } from 'react';
import ModeContext from '../context/context';
import Loginfooter from './Loginfooter';
import Input from './UI/Input';

function Loginform() {
  const { user, setUser, setMode } = useContext(ModeContext);

  useEffect(() => setMode('login'));


  return (
    <div className="loginform">
      <div className="loginform__header">
        Login
      </div>
      <div className="loginform__body">
        <Input
          input={{
            type: "text",
            value: user.name,
            onChange: (e) => setUser({ ...user, name: e.target.value }),
            autoComplete: "off"
          }}
          label="Username or email"
          name="user_name"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "password",
            value: user.password,
            onChange: (e) => setUser({ ...user, password: e.target.value })
          }}
          label="Password"
          name="user_password"
          className="loginform__body__field"

        />
        <button className="loginform__btn" onClick={() => console.log(user)}>Login</button>

      </div>
      <Loginfooter />
    </div>
  )
}

export default Loginform;
