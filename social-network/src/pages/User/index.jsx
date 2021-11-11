import NavBar from 'components/NavBar';
import Cookies from 'js-cookie';
import React from 'react';
import { useParams } from 'react-router';


const User = () => {
  const { id } = useParams();
  const [displayedUser, setDisplayedUser] = React.useState({});
  const [displayedUserPosts, setDisplayedUserPosts] = React.useState([]);

  React.useEffect(
    () => {
      fetch(`http://localhost:1337/users/${id}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt')}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((response) => { setDisplayedUser(response) })
        .catch((error) => console.error(error));

      fetch(`http://localhost:1337/posts?user.id=${id}`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt')}`,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((response) => { setDisplayedUserPosts(response) })
        .catch((error) => console.error(error));
      return
    }, [id]
  );
  return (
    <div className="user">
      <NavBar />
      <h2>User</h2>
      <p>Username: {displayedUser.username}</p>
      <p>Email: {displayedUser.email}</p>
      <p>Description: {displayedUser.description}</p>
      <p>Id: {id}</p>
      {displayedUserPosts.length > 0 ? displayedUserPosts.map((post) => (
        <div key={`post${post.id}`}>
          <h4>Post du {post.created_at}</h4>
          <p>{post.text}</p>
          <p>Likes: {post.like}</p>
        </div>
      )) : ''}
    </div>
  );
};

export default User;