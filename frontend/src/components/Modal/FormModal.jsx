import {Modal} from 'react-bootstrap';
import React from 'react';


import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm'


const FormModal = props => {

    const [user, token] = useAuth();
    
    const [formData, handleInputChange, handleSubmit] = useCustomForm(props.initialValues, props.submit, props.token, props.postId)

    


    return (
        <div className='modal'>
            <Modal show={props.show} onHide={props.handleClose} >
                <div className='modal-content'>
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
                    <button type='submit' onClick={props.handleClose} >Confirm</button>
                </form>
            </div>
            </Modal>
        </div>
    )
}

export default FormModal