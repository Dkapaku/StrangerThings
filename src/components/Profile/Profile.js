import { useEffect, useState } from 'react';
import "./Profile.css"
import Login from '../Login.js'
const cohort_Name='2301-ftb-mt-web-ft';
const base_URL=`https://strangers-things.herokuapp.com/api/${cohort_Name}`
const ProfilePage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const accountToken = localStorage.getItem("accountToken");

  useEffect(() => {
    if (accountToken) {
      setAuthenticated(true);
      fetchPosts();
    }
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch(`${base_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accountToken}`
        }
      });
      const { data } = await response.json();
      setUserPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  }
  async function deletePost(postId) {
    try {
      const POST_ID = postId;
      const response = await fetch(`${base_URL}/posts/${POST_ID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accountToken}`
        }
      });
      const { success } = await response.json();
      if (success) {
        const updatedPosts = userPosts.filter(post => post._id !== postId);
        setUserPosts(updatedPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {authenticated ? (
        <>
          <h1>Your Posts</h1>
          {userPosts.map(post => (
            <div key={post._id}>
              <p>
                <h1>{post.title}</h1> - {post.description} - Price: {post.price}
              </p>
              <button onClick={() => deletePost(post._id)}>X</button>
            </div>
          ))}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ProfilePage;