import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const PostCard = (props) => {

  const post = props.post;
  const user = props.user;
  const data = props.data;
  const setData = props.setData;

  const [display, setDisplay] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  React.useEffect(
    () => {
      if (post.likes.length > 0)
        post.likes.map((userlike) => {
          if (userlike.id === user.user.id)
            return setLiked(true);
          return userlike;
        })
      return;
      // eslint-disable-next-line
    }, []
  );

  const editPost = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:1337/posts/${id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: e.target.children[1].value })
    })
      .then((response) => response.json())
      .then((response) => {
        setData(data.map((post) => {
          if (post.id === id)
            return {
              ...post,
              text: e.target.children[1].value
            }
          else return post;
        }))
      })
      .catch((error) => console.error(error));
  }

  const deletePost = (e, id) => {
    e.preventDefault();
    fetch(`http://localhost:1337/posts/${id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((response) => { setData(data.filter((post) => post.id !== id)) })
      .catch((error) => console.error(error));
  }

  const displayEditForm = (e) => {
    e.preventDefault();
    setDisplay(!display);
  }

  const likeAPost = (e, id) => {
    e.preventDefault();

    let likesTmp = [];
    if (liked === true)
      likesTmp = post.likes.filter((userlike) => userlike.id !== user.user.id);
    else
      likesTmp = [...post.likes, user.user];

    setLiked(!liked);

    fetch(`http://localhost:1337/posts/${id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likesTmp
      })
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="post-card" id={`post${post.id}`}>
      <h4>Post crée le {post.created_at}</h4>
      <p>{post.text}</p>
      <p>likes: {post.like}</p>
      <p>User: <Link to={`/users/${post.user.id}`}>{post.user.username}</Link></p>
      {post.user.id === user.user.id ?
        <button onClick={(e) => deletePost(e, post.id)}>Delete Post</button>
        : ''}
      {post.user.id === user.user.id ?
        <button onClick={(e) => displayEditForm(e)}>Edit Post</button>
        : ''}
      {display ?
        <form id={`edit-form-${post.id}`} onSubmit={(e) => editPost(e, post.id)}>
          <p>Editez votre poste: </p>
          <textarea placeholder={post.text}></textarea>
          <input type="submit" value="Edit" />
        </form>
        : ''}
      <button onClick={(e) => likeAPost(e, post.id)}>{liked ? 'Dislike' : 'Like'}</button>
    </div>
  );
};

export default PostCard;
