import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import EditComment from "../EditComment/EditComment";
import './CommentModal.css'

const CommentModal = (props) => {
  const [user, token] = useAuth();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(props.initialValues, createComment);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("")
  const [commentId, setcommentId] = useState("");
  const [editCommentShowState, setEditCommentShowState] = useState(false)
  

  const handleEditCommentClose = () => {
    setEditCommentShowState(false)
  }


  const handleEditCommentShowState = (commentId) => {
    setcommentId(commentId)
    setEditCommentShowState(true)
  }

    async function createComment(){
      try {
        let response = await axios.post('http://127.0.0.1:8000/api/forum_posts/user/comments/', {...formData, ["post"]: props.postId}, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        await onCommentSubmit();
      } catch (error) {
        console.log(error.message)
      }
    }

  

  async function onCommentSubmit(){
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/forum_posts/comments/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function deleteComment(commentId){
    let response = await axios.delete(
      `http://127.0.0.1:8000/api/forum_posts/user/deletecomment/${commentId}/`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    await onCommentSubmit();
  }


  


  useEffect(() => {
    const fetchComments = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/forum_posts/comments/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [token]);

  return (
    <>
     
      <div className="modal">
        <> <EditComment 
        onCommentSubmit={onCommentSubmit}
        show={editCommentShowState}
        handleClose={handleEditCommentClose}
        postId={props.postId}
        commentId={commentId}
        initialValues={{
          text: "",
          post: props.postId
        }} 
      /></>
        <Modal show={props.show} onHide={props.handleClose}>
          <div className="modal-content">
            <br></br>
            <h5>Create Comment:</h5>
              <form className="comment-form" onSubmit={handleSubmit}>
                <input
                  className="comment-input"
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                />
                <button className="btn-create2" type="submit">
                  Confirm
                </button>
              </form>
              <br></br>
            <div className="container">
                <h4 className="comments-header">Comments</h4>
                <br></br>
                <hr></hr>
              {comments &&
                comments.map((comment) => (
                  <div className="comment-container">
                    {comment.post === props.postId && (
                      <>
                        <div className="comment-box">
                          <h4>{comment.user.username}</h4>
                          <p>{comment.text}</p>       
                        </div>
                        {user.id === comment.user.id && 
                        <>
                        <button type="button" className="btn-edit" onClick={() => handleEditCommentShowState(comment.id)}>Edit</button>
                        <button type="button" className="btn-delete" onClick={() => deleteComment(comment.id)}>Delete</button>
                        <br></br>
                        <hr></hr>
                        </>
                        }
                        </>
                    )}
                  </div>
                )).reverse()}
                
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CommentModal;
