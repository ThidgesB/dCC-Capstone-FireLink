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
  };

  const onCommentClick = (post) => {
    setShowCommentModalState(true);
    setPostId(post.id);
  };

  const onCreatePost = () => {
    setShowFormModalState(true);
  };

  const onEditPost = (post) => {
    setShowEditModalState(true);
    setPostId(post.id);
    setPostTitle(post.title);
    setPostBody(post.body);
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
    delete_post(post);
  };

  async function delete_post(post) {
    let response = await axios.delete(
      `http://127.0.0.1:8000/api/forum_posts/user/deletepost/${post.id}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
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
          text: "",
        }}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-md-5 ">
            <h1 style={{color: 'white'}}>Home Page for {user.username}!</h1>
            <br></br>
            <button className="btn-create" type="button" onClick={onCreatePost}>
              Create Post
            </button>
            {posts &&
              posts
                .map((post) => (
                  <div className="post-box" key={post.id}>
                    <br></br>
                    <div className="row">
                      <div className="col-md-12 col-xs-12 col-lg-12 px-4">
                        <div className="card ">
                          <div className="card-header">
                            <strong>{post.user.username}</strong><span>: {post.date_posted}</span>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row rating">
                      <div className="col-md-12 col-xs-12 col-lg-12">
                        Rating: {post.rating}
                      </div>
                    </div>
                    <br></br>
                    <div className="row align-items-center">
                      <div
                        className={
                          user.id == post.user.id
                            ? "col-xs-12 col-md-12 col-lg-4"
                            : "col-xs-12"
                        }
                      >
                        <button
                          type="button"
                          className="btn-Comments btn-sm"
                          onClick={() => onCommentClick(post)}
                        >
                          <span>
                            <i class="fa-solid fa-comments"></i> Comments{" "}
                          </span>
                        </button>
                      </div>
                      {user.id == post.user.id && (
                        <>
                          <div className="col-xs-12 col-md-12 col-lg-4">
                            <button
                              className=" btn-edit btn-sm"
                              type="button"
                              onClick={() => onEditPost(post)}
                            >
                              <i className="fa-solid fa-pencil"></i> Edit
                            </button>
                          </div>
                          <div className="col-xs-12 col-md-12 col-lg-4">
                            <button
                              className="btn-sm btn-delete"
                              type="button"
                              onClick={() => onDeletePost(post)}
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <br></br>
                  </div>
                ))
                .reverse()}
          </div>
        </div>
      </div>

      <style>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </style>
    </>
  );
};

export default HomePage;
