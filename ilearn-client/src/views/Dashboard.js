import React, {useContext, useEffect} from 'react'
import {PostContext} from '../contexts/PostContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import { AuthContext } from '../contexts/AuthContext'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import OverLayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import UpdatePostModal from '../components/posts/UpdatePostModal'


const Dashboard = () => {
    //contexts
    const {authState: {user: {username}}} = useContext(AuthContext)
    const {
        postState : {post, posts, postLoading},
        getPosts,
        setShowModal, 
        showToast: {show, message, type}, 
        setShowToast
    
    } = useContext(PostContext);

    useEffect(() => getPosts(), [])

    let body = null;
    if(postLoading){

        body = (<div className="spinner-container">
                 <Spinner animation='border' variant='info'/>
                </div>);

    } 
    else if(posts.length === 0){
        body = (<>
                    <Card className='text-center mx-5 my-5'>
                        <Card.Header as='h1'>Hi {username}</Card.Header>
                        <Card.Body>
                            <Card.Title>Welcome To LearnIt</Card.Title>
                            <Card.Text>
                                Click button below to track your first skill to learn    
                            </Card.Text>
                            <Button variant='primary' onClick={setShowModal.bind(this,true)}>Learn</Button>    
                        </Card.Body>   
                    </Card>     
                </>)
    }
    else {
        body = (<>
            <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                {posts.map(post => (
                    <Col key={post._id} className='my-2'>
                       <SinglePost post={post}/>
                    </Col>
                ))}

            </Row>
            {/* Open Modal */}
            {/* <OverLayTrigger placement='left' overlay={<Tooltip>Add a new one</Tooltip>} > */}
            <Button className='btn-floating' onClick={setShowModal.bind(this,true)}>
                <img src={addIcon} alt="add-post" width='60' height='60'/>
            </Button>
            {/* </OverLayTrigger> */}
        </>)
    }
    return (
        <>
           {body}
           <AddPostModal/>
           {post !== null && <UpdatePostModal/> }
           {/* show toast after post is added successfully */}
           <Toast 
           show={show} 
           style={{position: 'fixed', top: '20%', right: '10px'}} 
           className={`bg-${type} text-white`}
           onClose= {setShowToast.bind(this, {show: false, message:'', type: null})}
           delay={3000}
           autohide
           animation={false}
           >
               <Toast.Body>
                   <strong>{message}</strong>
               </Toast.Body>
           </Toast>
        </>
    )
}

export default Dashboard
