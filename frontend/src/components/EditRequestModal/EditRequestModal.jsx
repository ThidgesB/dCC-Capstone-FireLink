import {Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'
import { useState } from 'react';

const EditRequestModal = props => {

    const [user, token] = useAuth();
    const [formData, handleInputChange, handleSubmit] = useCustomForm(props.initialValues, editRequest)


    async function editRequest(){
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/help_requests/user/requests/edit/${props.requestId}/`, formData, {
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
                        Game:{""}
                        <input
                            type='text'
                            name='game'
                            value={formData.game}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Details:{""}
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
                            <input
                                type='number'
                                name='platform'
                                value={formData.platform}
                                onChange={handleInputChange}
                            />
                        </label>
                    <button type='submit' onClick={props.handleClose}>Confirm</button>
                </form>
                </div>
            </Modal>
        </div>
    )


}

export default EditRequestModal