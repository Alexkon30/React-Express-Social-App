import React, { useState } from 'react';
import Input from './UI/Input'
import Registerfooter from './Registerfooter';

function Registerform() {
  // const [user, setUser] = useState({
  //   name: '',
  //   email: '',
  //   pass: '',
  //   confirmedPass: '',
  //   agreement: false
  // })

  return (
    <div className="registration">
      <div className="registration__header">Registration</div>
      <div className="registration__body">
        <Input type="text" label="Username" name="user_name" />
        <Input type="text" label="Email" name="user_email" />
        <Input type="password" label="Password" name="user_password" />
        <Input type="password" label="Confirm password" name="user_password_confirm" />
        {/* <Input type="checkbox" label="Agree with our terms and policies" name="agree" /> */}
        <button className="registration__btn">Register</button>
      </div>
      <Registerfooter />
    </div>
  )
}

export default Registerform;
