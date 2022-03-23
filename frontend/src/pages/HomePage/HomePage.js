import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
// dCC provided custom hook for simplified user authentication
import useAuth from "../../hooks/useAuth";
import { createNewPost, editPost } from "../../utils/PostApi";
import FormModal from "../../components/Modal/FormModal";
import "./HomePage.css";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [formSubmitState, setFormSubmitState] = useState(createNewPost);
  const [showFormModalState, setShowFormModalState] = useState(false);

  const handleClose = () => {
    setFormSubmitState(createNewPost)
    setShowFormModalState(false);
    setPostTitle("")
    setPostBody("")
  };


  const onCreatePost = () => {
    setShowFormModalState(true);
  };

  const onEditPost = (post) => {
    setFormSubmitState(editPost)
    setShowFormModalState(true);
    setPostId(post.id);
    setPostTitle(post.title)
    setPostBody(post.body)
  };

  const onDeletePost = (post) => {
    delete_post(post)
  }

  async function delete_post(post){
    let response = await axios.delete(
      `http://127.0.0.1:8000/api/forum_posts/user/deletepost/${post.id}/`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    navigate('/')
  }

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
        token={token}
        submit={formSubmitState}
        postId={postId}
        show={showFormModalState}
        handleClose={handleClose}
        initialValues={{
          title: postTitle,
          body: postBody,
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
                  {user.user_id == post.user.id && 
                  <button type="button" onClick={() => onEditPost(post)}>
                    Edit
                  </button>
                  }
                  {user.user_id == post.user.id &&
                  <button type="button" onClick={() => onDeletePost(post)}>Delete</button>
                  }
                </p>
              </div>
            ))
            .reverse()}
      </div>
    </>
  );
};

export default HomePage;
