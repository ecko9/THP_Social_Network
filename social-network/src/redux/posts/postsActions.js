import { FETCH_USER_POSTS, FETCH_USER_POSTS_SUCCESS, FETCH_USER_POSTS_FAILED } from './postsTypes';

export const fetchUserPosts = () => {
  return {
    type: FETCH_USER_POSTS
  };
};
export const fetchUserPostsSuccess = (posts) => {
  return {
    type: FETCH_USER_POSTS_SUCCESS,
    posts
  };
};
export const fetchUserPostsFailed = (error) => {
  return {
    type: FETCH_USER_POSTS_FAILED,
    error
  };
};
