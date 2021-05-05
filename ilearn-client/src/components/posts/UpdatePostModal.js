import React, { useEffect } from 'react'
import  {useContext, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import {PostContext} from '../../contexts/PostContext'
const UpdatePostModal = () => {
    const {
        
        showUpdateModal, 
        setShowUpdateModal,
        updatePost,
        setShowToast,
        postState: {post}
    } = useContext(PostContext);


    const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdateModal(false);
    }

    //State
    const  [updatedPost, setUpdatedPost] = useState(post)

    useEffect(() => setUpdatedPost(post), [post])
    const {title, description, url, status} = updatedPost;
    
    const onChangeUpdatedPostForm = event =>
		setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })


    const submit = async e => {
        e.preventDefault();
        const {success, message} = await updatePost(updatedPost);
        setShowUpdateModal(false);
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
       
    }

    
    return (
        <div>
            <Modal show={showUpdateModal} animation={false} onHide={closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Progress</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control 
                                type='text' 
                                placeholder='Title' 
                                name='title'
                                aria-describedby='title-help' 
                                required
                                value={title}
                                onChange={onChangeUpdatedPostForm}
                                ></Form.Control>
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                as='textarea' 
                                placeholder='Description'
                                rows={3} 
                                name='description'
                                value={description}
                                onChange={onChangeUpdatedPostForm}                
                            ></Form.Control>                           
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                type='text' 
                                placeholder='url'
                                name='url'
                                value={url}
                                onChange={onChangeUpdatedPostForm}   
                            ></Form.Control>                           
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as='select'
                                value = {status}
                                name= "status"
                                onChange={onChangeUpdatedPostForm}
                            >
                                <option value="TO LEARN">TO LEARN</option>
                                <option value="LEARNING">LEARNING</option>
                                <option value="LEARNED">LEARNED</option>

                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeDialog} >Cancel</Button>
                        <Button variant='primary' type='submit' >Submit</Button>

                    </Modal.Footer>
                </Form>
                
            </Modal>
        </div>
    )
}

export default UpdatePostModal
