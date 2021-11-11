import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyProfile, fetchMyProfileSucces, fetchMyProfileFailed } from './redux';
import Cookies from 'js-cookie';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Profile from 'pages/Profile';
import User from 'pages/User';

const App = () => {

  const user = useSelector(state => state.users);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      const reconnect = () => {
        return (dispatch) => {
          dispatch(fetchMyProfile());
          fetch('http://localhost:1337/users/me', {
            method: 'get',
            headers: {
              'Authorization': `Bearer ${Cookies.get('jwt')}`,
              'Content-Type': 'application/json'
            },
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.error)
                dispatch(fetchMyProfileFailed(response.error));
              else
                dispatch(fetchMyProfileSucces(Cookies.get('jwt'), response));
            })
            .catch((error) => console.error(error));
        }
      }
      if (Cookies.get('jwt') !== undefined)
        dispatch(reconnect());
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  );

  return (
    <div className="app">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        {user.jwt ? <Route path="/profile" exact element={<Profile />} /> : ''}
        {user.jwt ? <Route path="/users/:id" exact element={<User />} /> : ''}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;