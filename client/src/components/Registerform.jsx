import React, { useContext, useEffect } from 'react';
import Input from './UI/Input'
import Registerfooter from './Registerfooter';
import ModeContext from '../context/context';

function Registerform() {
  const { user, setUser, setMode } = useContext(ModeContext)

  // ???
  useEffect(() => setMode('register'));
  //

  return (
    <div className="registration">
      <div className="registration__header">Registration</div>
      <div className="registration__body">
        <Input
          input={{
            type: "text",
            value: user.name,
            onChange: (e) => setUser({ ...user, name: e.target.value }),
            autoComplete: "off"
          }}
          label="Username"
          name="user_name"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "text",
            value: user.email,
            onChange: (e) => setUser({ ...user, email: e.target.value }),
            autoComplete: "off"
          }}
          label="Email"
          name="user_email"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "password",
            value: user.password,
            onChange: (e) => setUser({ ...user, password: e.target.value }),
          }}
          label="Password"
          name="user_password"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "password",
            value: user.confirmedPass,
            onChange: (e) => setUser({ ...user, confirmedPass: e.target.value }),
          }}
          label="Confirm password"
          name="user_password_confirm"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "checkbox",
            value: user.agreement,
            onChange: (e) => setUser({ ...user, agreement: e.target.checked })
          }}
          label="Agree with our terms and policies"
          className="loginform__body__checkbox"
        />
        <button
          disabled={!user.agreement}
          className="registration__btn"
          onClick={() => console.log(user)}>Register</button>
      </div>
      <Registerfooter />
    </div>
  )
}

export default Registerform;
