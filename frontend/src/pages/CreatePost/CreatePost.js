import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'

let initialValues = {
    title: "",
    body: ""
};

const CreatePostPage = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, createNewPost)

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
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <label>
                    Title:{" "}
                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Body:{" "}
                    <input
                        type='text'
                        name='body'
                        value={formData.body}
                        onChange={handleInputChange}
                    />
                </label>
                <button type='submit' >Create Post</button>
            </form>
        </div>
    )

}


export default CreatePostPage