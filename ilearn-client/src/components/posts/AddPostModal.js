import React, {useContext, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import {PostContext} from '../../contexts/PostContext'


const AddPostModal = () => {
    //contexts
    const {showModal, setShowModal,addPost,setShowToast} = useContext(PostContext);
    const closeDialog = () => {
        resetAddPostData();
    }
    //State
    const  [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN'
	})

    const {title, description, url} = newPost;
    
    const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })


    const submit = async e => {
        e.preventDefault();
        const {success, message} = await addPost(newPost);
        resetAddPostData();
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
       
    }

    const resetAddPostData = () => {
		setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
		setShowModal(false)
	}
    return (
        <div>
            <Modal show={showModal} animation={false} onHide={closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>What do you want to learn?</Modal.Title>
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
                                onChange={onChangeNewPostForm}
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
                                onChange={onChangeNewPostForm}                
                            ></Form.Control>                           
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                type='text' 
                                placeholder='url'
                                name='url'
                                value={url}
                                onChange={onChangeNewPostForm}   
                            ></Form.Control>                           
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeDialog}>Cancel</Button>
                        <Button variant='primary' type='submit'>Submit</Button>

                    </Modal.Footer>
                </Form>
                
            </Modal>
        </div>
    )
}

export default AddPostModal
