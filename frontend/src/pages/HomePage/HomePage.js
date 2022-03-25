import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
// dCC provided custom hook for simplified user authentication
import useAuth from "../../hooks/useAuth";

import FormModal from "../../components/Modal/FormModal";
import "./HomePage.css";
import EditModal from "../../components/EditModal/EditModal";
import CommentModal from "../../components/CommentModal/CommentModal";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  //const [comments, setComments] = useState([]);

  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [showFormModalState, setShowFormModalState] = useState(false);
  const [showEditModalState, setShowEditModalState] = useState(false);
  const [showCommentModalState, setShowCommentModalState] = useState(false);

  const handleClose = () => {
    setShowFormModalState(false);
  };

  const handleEditClose = () => {
    setShowEditModalState(false);
  };

  const handleCommentClose = () => {
    setShowCommentModalState(false);
  }

  const onCommentClick = (post) => {
    setShowCommentModalState(true);
    setPostId(post.id);
  }

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
  }


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
      <CommentModal 
        postId={postId}
        show={showCommentModalState}
        handleClose={handleCommentClose}
        initialValues={{
          post: postId,
          text: ""
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
                  {user.id == post.user.id && 
                  <button type="button" onClick={() => onEditPost(post)}>
                    Edit
                  </button>
                  }
                  {user.id == post.user.id &&
                  <button type="button" onClick={() => onDeletePost(post)}>Delete</button>
                  }
                  <button type="button" onClick={() => onCommentClick(post)}>
                    Comments
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
