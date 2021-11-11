import React from 'react';
import NavBar from 'components/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { fetchMyProfileSucces } from '../../redux';
import PostCard from 'components/PostCard';


const Profile = () => {

  const user = useSelector(state => state.users);
  const [userPosts, setUserPosts] = React.useState([]);
  const dispatch = useDispatch();

  const editDescription = (e) => {
    e.preventDefault();

    fetch(`http://localhost:1337/users/me`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: e.target.children[0].value
      })
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(fetchMyProfileSucces(Cookies.get('jwt'), response));
      })
      .catch((error) => console.error(error));
  }

  React.useEffect(
    () => {
      fetch(`http://localhost:1337/posts?user.id=${user.user.id}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt')}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((response) => { setUserPosts(response) })
        .catch((error) => console.error(error));
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  );

  return (
    <div className="profile">
      <NavBar />

      <h2>Profile</h2>
      <p>Username: {user.user.username}</p>
      <p>Email: {user.user.email}</p>
      <p>Description: {user.user.description}</p>
      <p>Id: {user.user.id}</p>

      <h3>Edit description</h3>
      <form onSubmit={(e) => editDescription(e)}>
        <textarea placeholder={user.user.description}></textarea>
        <input type="submit" value="Change" />
      </form>

      <h3>Your Posts</h3>
      {userPosts.length > 0 ? userPosts.map((post) => (
        <PostCard key={`post${post.id}`} post={post} user={user} data={userPosts} setData={setUserPosts} />
      )) : ''}

    </div>
  );
};

export default Profile;