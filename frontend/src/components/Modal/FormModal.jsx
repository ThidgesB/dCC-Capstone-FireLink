import {Modal} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormModal.css'

import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'


const FormModal = props => {

    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(props.initialValues, createNewPost)

    async function createNewPost(){
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/forum_posts/user/posts/', formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            navigate('/')
        } catch (error) {
            console.log(error.message)
        }
        await props.getAllPosts()
    }


    return (
        <div className='modal'>
            <Modal show={props.show} onHide={props.handleClose} >
                <div className='modal-content'>
                <form className='form' onSubmit={handleSubmit}>
                    <br></br>
                    <label>
                        Title:{" "}
                    </label>
                    <textarea
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            className='title-field'
                        />
                    <label>
                        Body:{" "}
                    </label>
                    <textarea
                            type='text'
                            name='body'
                            value={formData.body}
                            onChange={handleInputChange}
                            className='body-field'
                        />
                    <button type='submit' className='btn-create' onClick={props.handleClose} >Confirm</button>
                    <br></br>
                </form>
            </div>
            </Modal>
        </div>
    )
}

export default FormModal