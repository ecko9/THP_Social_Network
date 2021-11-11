import NavBar from 'components/NavBar';
import PostCard from 'components/PostCard';
import Cookies from 'js-cookie';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const user = useSelector(state => state.users);
  const [allPosts, setAllPosts] = React.useState([]);

  const fetchAllPosts = () => {
    fetch(`http://localhost:1337/posts`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setAllPosts(response);
      })
      .catch((error) => console.error(error));
  }

  React.useEffect(
    () => {
      fetchAllPosts();
      return;
    }, []
  );

  const createPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:1337/posts`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: e.target.children[0].value, user: user.user.id })
    })
      .then((response) => response.json())
      .then((response) => {
        fetchAllPosts();
      })
      .catch((error) => console.error(error));
  }


  return (
    <div className="home">
      <NavBar />
      <h2>Accueil</h2>
      {Cookies.get('jwt') !== undefined ?
        <div>
          <form onSubmit={(e) => createPost(e)}>
            <textarea placeholder="Post Content"></textarea>
            <input type="submit" value="Create Post" />
          </form>
          <div>
            {allPosts.length > 0 ? allPosts.map((post) => (
              <PostCard key={`post${post.id}`} post={post} user={user} data={allPosts} setData={setAllPosts} />
            )) : ''}
          </div>
        </div>
        : ''}
    </div>
  );
};

export default Home;