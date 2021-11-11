import React from 'react';
import { useDispatch } from 'react-redux';
import NavBar from 'components/NavBar';

import Cookies from 'js-cookie';
import { fetchRegister, fetchRegisterSuccess, fetchRegisterFailed } from '../../redux';
import { useNavigate } from 'react-router';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tryConnection = (data) => {
    return (dispatch) => {
      dispatch(fetchRegister());
      fetch('http://localhost:1337/auth/local', {
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
            document.querySelector('#forms-errors').innerHTML = '';
            dispatch(fetchRegisterSuccess(response.jwt, response.user))
            navigate('/');
          }
        })
        .catch((error) => console.error(error));
    }
  }

  const connectUser = (e) => {
    e.preventDefault();

    const data = {
      identifier: e.target.children[2].value,
      password: e.target.children[5].value
    };

    dispatch(tryConnection(data));
  }

  return (
    <div className="login">
      <NavBar />
      <h2>Login</h2>
      <p id="forms-errors"></p>

      <form onSubmit={(e) => connectUser(e)}>
        <h3>Connection</h3>
        <p>Username / Email</p>
        <input type="text" name="identifier" id="connect-identifier" />
        <br /><p>Password</p>
        <input type="text" name="password" id="connect-password" />
        <br />
        <input type="submit" value="Connect" />
      </form>

    </div>
  );
};

export default Login;