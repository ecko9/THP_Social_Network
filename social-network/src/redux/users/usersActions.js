import {
  FETCH_REGISTER, FETCH_REGISTER_SUCCESS, FETCH_REGISTER_FAILED,
  DISCONNECT,
  FETCH_MY_PROFILE, FETCH_MY_PROFILE_SUCCESS, FETCH_MY_PROFILE_FAILED,
} from "./usersTypes";

export const fetchRegister = () => {
  return {
    type: FETCH_REGISTER
  };
};
export const fetchRegisterSuccess = (jwt, user) => {
  return {
    type: FETCH_REGISTER_SUCCESS,
    jwt,
    user
  };
};
export const fetchRegisterFailed = (error) => {
  return {
    type: FETCH_REGISTER_FAILED,
    error
  };
};

export const disconnect = () => {
  return {
    type: DISCONNECT
  };
};

export const fetchMyProfile = () => {
  return {
    type: FETCH_MY_PROFILE
  };
};
export const fetchMyProfileSucces = (jwt, user) => {
  return {
    type: FETCH_MY_PROFILE_SUCCESS,
    jwt,
    user
  };
};
export const fetchMyProfileFailed = (error) => {
  return {
    type: FETCH_MY_PROFILE_FAILED,
    error
  };
};
