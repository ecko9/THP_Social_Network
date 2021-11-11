import {
  FETCH_REGISTER, FETCH_REGISTER_SUCCESS, FETCH_REGISTER_FAILED,
  DISCONNECT,
  FETCH_MY_PROFILE, FETCH_MY_PROFILE_SUCCESS, FETCH_MY_PROFILE_FAILED,
} from "./usersTypes";

const initialState = {
  loading: false,
  jwt: null,
  user: {},
  error: ''
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_REGISTER:
      return {
        ...state,
        loading: true
      };
    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        jwt: action.jwt,
        user: action.user,
        loading: false
      };
    case FETCH_REGISTER_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case DISCONNECT:
      return {
        ...state,
        user: {},
        jwt: null
      };

    case FETCH_MY_PROFILE:
      return {
        ...state,
        loading: true
      };
    case FETCH_MY_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        jwt: action.jwt,
        loading: false
      };
    case FETCH_MY_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
}