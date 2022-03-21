import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
// dCC provided custom hook for simplified user authentication
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/forum_posts/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <Link to="/createpost">Create Post</Link>
      {posts &&
        posts.map((post) => (
          <fieldset>
            <p key={post.id}>
              <h4>{post.title}</h4>
              <div>{post.date_posted}</div>
              <body>{post.body}</body>
            </p>
          </fieldset>
        ))}
    </div>
  );
};

export default HomePage;
