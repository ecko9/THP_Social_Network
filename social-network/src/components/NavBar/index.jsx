import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { disconnect } from '../../redux';

import Cookies from 'js-cookie';

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const disconnectUser = (e) => {
    e.preventDefault();
    dispatch(disconnect());
    if (Cookies.get('jwt') !== undefined)
      Cookies.remove('jwt');
    navigate('/');
  }

  return (
    <div className="nav-bar">
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink to="/register">
        Register
      </NavLink>
      {Cookies.get('jwt') !== undefined ?
        <NavLink to="/profile">
          Profile
        </NavLink> : null}
      <div className="disconnect" onClick={disconnectUser}>
        Disconnect
      </div>
    </div>
  );
};

export default NavBar;