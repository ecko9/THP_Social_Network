import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import NavBar from 'components/NavBar';

import Cookies from 'js-cookie';
import { fetchRegister, fetchRegisterSuccess, fetchRegisterFailed } from '../../redux';


const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tryRegister = (data) => {
    return (dispatch) => {
      dispatch(fetchRegister());
      fetch('http://localhost:1337/auth/local/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            document.querySelector('#forms-errors').innerHTML = response.message[0].messages[0].message;
            dispatch(fetchRegisterFailed(response.error))
          }
          if (response.jwt) {
            if (Cookies.get('jwt') !== undefined)
              Cookies.remove('jwt');
            Cookies.set('jwt', response.jwt);
            dispatch(fetchRegisterSuccess(response.jwt, response.user));
            navigate('/');
          }
        })
        .catch((error) => console.error(error));
    };

  }

  const registerUser = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.children[2].value,
      email: e.target.children[5].value,
      password: e.target.children[8].value
    };

    dispatch(tryRegister(data))
  }

  return (
    <div className="register">
      <NavBar />
      <h2>Register</h2>
      <p id="forms-errors"></p>

      <form onSubmit={(e) => registerUser(e)}>
        <h3>Register</h3>
        <p>Username</p>
        <input type="text" name="username" id="register-username" />
        <br />
        <p>Email</p>
        <input type="text" name="email" id="register-email" />
        <br />
        <p>Password</p>
        <input type="text" name="password" id="register-password" />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;