import {Modal} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'

const CreateReqModal = props => {


    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(props.initialValues, createRequest)


    async function createRequest(){
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/help_requests/user/requests/', formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className='modal'>
            <Modal show={props.show} onHide={props.handleClose} >
                <div className='modal-content'>
                    <form className='form' onSubmit={handleSubmit}>
                        <label>
                            Game:{" "}
                            <input 
                                type='text'
                                name='game'
                                value={formData.game}
                            />
                        </label>
                        <label>
                            
                        </label>
                    </form>
                </div>
            </Modal>
        </div>
    )




















}

export default CreateReqModal