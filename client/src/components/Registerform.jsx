import React, { useContext, useEffect } from 'react';
import Input from './UI/Input'
import GlobalContext from '../context/context';
import axios from 'axios';
import Formfooter from './UI/Formfooter';

function Registerform() {
  const { form, setForm, setMode, login } = useContext(GlobalContext)

  useEffect(() => {
    setMode('register');
    setForm({
      username: '',
      email: '',
      password: '',
      confirmedPass: '',
      agreement: false
    });
  }, []);

  const registerAxios = body => {
    axios.post('http://localhost:5000/register', body)
      .then(response => {
        if (response.data.success) {
          login(response.data.token)
        }
        //добавить логику для отображения ошибок
      })
      .catch(err => console.log(err.response.data.message))
  }

  const registerFetch = (body) => {
    fetch('http://localhost:5000/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(result => console.log(result.message))
      .catch(err => console.log(err))
  }

  return (
    <div className="registration">
      <div className="registration__header">Registration</div>
      <div className="registration__body">
        <form action="">

        </form>
        <Input
          input={{
            type: "text",
            value: form.username,
            onChange: (e) => setForm({ ...form, username: e.target.value }),
            autoComplete: "off",
            // autoFocus: true
          }}
          label="Username"
          name="user_name"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "text",
            value: form.email,
            onChange: (e) => setForm({ ...form, email: e.target.value }),
            autoComplete: "off"
          }}
          label="Email"
          name="user_email"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "password",
            value: form.password,
            onChange: (e) => setForm({ ...form, password: e.target.value }),
          }}
          label="Password"
          name="user_password"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "password",
            value: form.confirmedPass,
            onChange: (e) => setForm({ ...form, confirmedPass: e.target.value }),
          }}
          label="Confirm password"
          name="user_password_confirm"
          className="loginform__body__field"
        />
        <Input
          input={{
            type: "checkbox",
            value: form.agreement,
            onChange: (e) => setForm({ ...form, agreement: e.target.checked })
          }}
          label="Agree with our terms and policies"
          className="loginform__body__checkbox"
        />
        <button
          disabled={!form.agreement}
          className="registration__btn"
          onClick={() => registerAxios(form)}>Register
        </button>
      </div>
      <Formfooter
        block="registration"
        text="Already have an account?"
        href="/login"
        linkText="Login"
      />
    </div>
  )
}

export default Registerform;
