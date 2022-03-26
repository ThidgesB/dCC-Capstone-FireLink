import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const EditComment = (props) => {

    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(props.initialValues, () => editComment(props.commentId))


    async function editComment(commentId){
        try {
          let response = await axios.put(`http://127.0.0.1:8000/api/forum_posts/user/editcomment/${commentId}/`,{...formData, ["post"]: props.postId}, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          await props.onCommentSubmit();
        } catch (error) {
          console.log(error.message)
        }
      }






    return (
        <> 
        <Modal key={props.commentId} show={props.show} onHide={props.handleClose}>
                <form className='form' onSubmit={handleSubmit}>
                    <label>
                        Text:{" "}
                        <input 
                            type='text'
                            name='text'
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type='submit'>Save</button>
                </form>
        </Modal>
        </> 
     );
}
 
export default EditComment;