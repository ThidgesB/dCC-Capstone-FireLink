import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
// dCC provided custom hook for simplified user authentication
import useAuth from "../../hooks/useAuth";

import FormModal from "../../components/Modal/FormModal";
import { propTypes } from "react-bootstrap/esm/Image";
import "./HomePage.css";
import EditModal from "../../components/EditModal/EditModal";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);

  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [showFormModalState, setShowFormModalState] = useState(false);
  const [showEditModalState, setShowEditModalState] = useState(false);

  const handleClose = () => {
    setShowFormModalState(false);
  };

  const handleEditClose = () => {
    setShowEditModalState(false);
  };

  const onCreatePost = () => {
    setShowFormModalState(true);
  };

  const onEditPost = (post) => {
    setShowEditModalState(true);
    setPostId(post.id);
    setPostTitle(post.title)
    setPostBody(post.body)
  };

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
    <>
      <FormModal
        show={showFormModalState}
        handleClose={handleClose}
        initialValues={{
          title: "",
          body: "",
        }}
      />
      <EditModal
        postTitle={postTitle}
        postBody={postBody}
        postId={postId}
        show={showEditModalState}
        handleClose={handleEditClose}
        initialValues={{
          title: "",
          body: "",
        }}
      />
      <div className="container">
        <h1>Home Page for {user.username}!</h1>
        <button type="button" onClick={onCreatePost}>
          Create
        </button>
        {posts &&
          posts
            .map((post) => (
              <div className="post-box">
                <p key={post.id}>
                  <div>{post.user.username}</div>
                  <h4>{post.title}</h4>
                  <div>{post.date_posted}</div>
                  <body>{post.body}</body>
                  <div>Rating: {post.rating}</div>
                  <button type="button" onClick={() => onEditPost(post)}>
                    Edit
                  </button>
                </p>
              </div>
            ))
            .reverse()}
      </div>
    </>
  );
};

export default HomePage;
