import { FETCH_USER_POSTS, FETCH_USER_POSTS_SUCCESS, FETCH_USER_POSTS_FAILED } from './postsTypes';

const initialState = {
  loading: false,
  posts: [],
  error: ''
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_USER_POSTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        loading: false
      };
    case FETCH_USER_POSTS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    default:
      return state;
  }
}