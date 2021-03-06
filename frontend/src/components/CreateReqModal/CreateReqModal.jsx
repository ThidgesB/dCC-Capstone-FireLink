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
            await props.getRequests()
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className='modal'>
            <Modal show={props.show} onHide={props.handleClose} >
                <div className='modal-content'>
                    <form className='form' onSubmit={handleSubmit}>
                        <br></br>
                        <label>
                            Game:{" "}
                            <input 
                                type='text'
                                name='game'
                                value={formData.game}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Details:{" "}
                            <input
                                type='text'
                                name='details'
                                value={formData.details}
                                onChange={handleInputChange}
                            />
                        </label>    
                        <label>
                            No. of players needed:{" "}
                            <input
                                type='number'
                                name='players_requested'
                                value={formData.players_requested}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Platform:{" "}
                            <select name='platform' value={formData.platform} onChange={handleInputChange}>
                                <option value={'1'} className='PS4'>PS4</option>
                                <option value={'2'} className="XboxOne" >Xbox One</option>
                                <option value={'3'} className='PCSteam'>PC Steam</option>
                                <option value={'4'} className="PCEpic">PC Epic Games</option>
                            </select>
                        </label>
                        <button type='submit' className='btn-create' onClick={props.handleClose} >Confirm</button>
                        <br></br>
                    </form>
                </div>
            </Modal>
        </div>
    )




















}

export default CreateReqModal